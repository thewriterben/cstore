const request = require('supertest');
const app = require('../src/app');
const webhookVerification = require('../src/utils/webhookVerification');

describe('Webhook Signature Verification', () => {
  const validPayload = {
    transaction_hash: '0xabc123',
    payment_id: 'pay_123',
    confirmations: 6,
    status: 'confirmed',
    amount: 0.1,
    currency: 'BTC'
  };

  beforeAll(() => {
    // Set webhook secret for tests
    process.env.WEBHOOK_SECRET = 'test-webhook-secret-for-testing-only';
  });

  describe('POST /api/webhooks/payment', () => {
    it('should accept webhook with valid signature', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Signature', `sha256=${signature}`)
        .set('X-Timestamp', timestamp.toString())
        .send(validPayload);

      // Accept both 200 and 404 (payment not found is OK for test)
      expect([200, 404]).toContain(res.statusCode);
    });

    it('should reject webhook with invalid signature', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const invalidSignature = 'invalid_signature_12345';

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Signature', `sha256=${invalidSignature}`)
        .set('X-Timestamp', timestamp.toString())
        .send(validPayload);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('verification failed');
    });

    it('should reject webhook without signature', async () => {
      const timestamp = Math.floor(Date.now() / 1000);

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Timestamp', timestamp.toString())
        .send(validPayload);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject webhook without timestamp', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Signature', `sha256=${signature}`)
        .send(validPayload);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject webhook with old timestamp (replay attack)', async () => {
      // Timestamp from 10 minutes ago
      const oldTimestamp = Math.floor(Date.now() / 1000) - (10 * 60);
      const signature = webhookVerification.generateSignature(validPayload, oldTimestamp);

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Signature', `sha256=${signature}`)
        .set('X-Timestamp', oldTimestamp.toString())
        .send(validPayload);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('replay');
    });

    it('should reject webhook with future timestamp', async () => {
      // Timestamp from 10 minutes in future
      const futureTimestamp = Math.floor(Date.now() / 1000) + (10 * 60);
      const signature = webhookVerification.generateSignature(validPayload, futureTimestamp);

      const res = await request(app)
        .post('/api/webhooks/payment')
        .set('X-Signature', `sha256=${signature}`)
        .set('X-Timestamp', futureTimestamp.toString())
        .send(validPayload);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Webhook Verification Utility', () => {
    it('should generate valid signature', () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);
      
      expect(signature).toBeDefined();
      expect(typeof signature).toBe('string');
      expect(signature.length).toBe(64); // SHA256 hex is 64 chars
    });

    it('should verify valid signature', () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);
      
      const isValid = webhookVerification.verifySignature(signature, validPayload, timestamp);
      expect(isValid).toBe(true);
    });

    it('should reject invalid signature', () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const invalidSignature = 'a'.repeat(64);
      
      const isValid = webhookVerification.verifySignature(invalidSignature, validPayload, timestamp);
      expect(isValid).toBe(false);
    });

    it('should reject signature for different payload', () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);
      
      const differentPayload = { ...validPayload, amount: 999 };
      const isValid = webhookVerification.verifySignature(signature, differentPayload, timestamp);
      expect(isValid).toBe(false);
    });

    it('should reject signature for different timestamp', () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = webhookVerification.generateSignature(validPayload, timestamp);
      
      const differentTimestamp = timestamp + 60;
      const isValid = webhookVerification.verifySignature(signature, validPayload, differentTimestamp);
      expect(isValid).toBe(false);
    });
  });
});
