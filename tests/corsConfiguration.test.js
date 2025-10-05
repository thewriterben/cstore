const request = require('supertest');
const app = require('../src/app');
const { getAllowedOrigins } = require('../src/config/cors');

describe('CORS Configuration', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalOrigins = process.env.ALLOWED_ORIGINS;

  afterEach(() => {
    // Restore original environment
    process.env.NODE_ENV = originalEnv;
    process.env.ALLOWED_ORIGINS = originalOrigins;
  });

  describe('getAllowedOrigins', () => {
    it('should return production origins in production', () => {
      process.env.NODE_ENV = 'production';
      delete process.env.ALLOWED_ORIGINS;

      const origins = getAllowedOrigins();
      
      expect(origins).toContain('https://cryptons.com');
      expect(origins).toContain('https://www.cryptons.com');
      expect(origins).toContain('https://app.cryptons.com');
      expect(origins).not.toContain('http://localhost:3000');
    });

    it('should return staging origins in staging', () => {
      process.env.NODE_ENV = 'staging';
      delete process.env.ALLOWED_ORIGINS;

      const origins = getAllowedOrigins();
      
      expect(origins).toContain('https://staging.cryptons.com');
      expect(origins).toContain('https://staging-app.cryptons.com');
    });

    it('should return development origins in development', () => {
      process.env.NODE_ENV = 'development';
      delete process.env.ALLOWED_ORIGINS;

      const origins = getAllowedOrigins();
      
      expect(origins).toContain('http://localhost:3000');
      expect(origins).toContain('http://localhost:3001');
    });

    it('should use ALLOWED_ORIGINS env variable when set', () => {
      process.env.NODE_ENV = 'production';
      process.env.ALLOWED_ORIGINS = 'https://custom1.com,https://custom2.com';

      const origins = getAllowedOrigins();
      
      expect(origins).toContain('https://custom1.com');
      expect(origins).toContain('https://custom2.com');
      expect(origins.length).toBe(2);
    });

    it('should handle ALLOWED_ORIGINS with whitespace', () => {
      process.env.ALLOWED_ORIGINS = ' https://example1.com , https://example2.com ';

      const origins = getAllowedOrigins();
      
      expect(origins).toContain('https://example1.com');
      expect(origins).toContain('https://example2.com');
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in response', async () => {
      const res = await request(app)
        .get('/api/health')
        .set('Origin', 'http://localhost:3000');

      // Should have CORS headers (either allow or deny)
      expect(res.headers).toHaveProperty('access-control-allow-origin');
    });

    it('should handle preflight OPTIONS request', async () => {
      const res = await request(app)
        .options('/api/auth/login')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type,Authorization');

      expect([200, 204]).toContain(res.statusCode);
    });
  });

  describe('Security', () => {
    it('should not use wildcard origin in production', () => {
      process.env.NODE_ENV = 'production';
      delete process.env.ALLOWED_ORIGINS;

      const origins = getAllowedOrigins();
      
      expect(origins).not.toContain('*');
      expect(Array.isArray(origins)).toBe(true);
    });

    it('should have specific allowed origins', () => {
      const origins = getAllowedOrigins();
      
      expect(Array.isArray(origins)).toBe(true);
      expect(origins.length).toBeGreaterThan(0);
    });
  });
});
