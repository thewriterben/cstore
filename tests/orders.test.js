const request = require('supertest');
const app = require('../src/app');
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');
const User = require('../src/models/User');
const { generateToken } = require('../src/utils/jwt');

describe('Orders API', () => {
  let adminToken;
  let userToken;
  let adminUser;
  let regularUser;
  let testProduct;

  beforeAll(async () => {
    // Only run if database is connected
    if (!global.isConnected()) {
      return;
    }

    // Create admin user
    adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    adminToken = generateToken(adminUser._id);

    // Create regular user
    regularUser = await User.create({
      name: 'Regular User',
      email: 'user@test.com',
      password: 'password123',
      role: 'user'
    });
    userToken = generateToken(regularUser._id);

    // Create test product
    testProduct = await Product.create({
      name: 'Test Product',
      description: 'Test product description',
      price: 0.005,
      priceUSD: 250,
      stock: 10,
      currency: 'BTC',
      isActive: true
    });
  });

  describe('POST /api/orders', () => {
    it('should create an order with valid data (authenticated user)', async () => {
      if (!global.isConnected()) return;

      const orderData = {
        productId: testProduct._id.toString(),
        quantity: 2,
        customerEmail: 'customer@test.com',
        cryptocurrency: 'BTC',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA'
        }
      };

      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(orderData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order).toBeDefined();
      expect(res.body.data.order.totalPrice).toBe(0.01);
      expect(res.body.data.order.totalPriceUSD).toBe(500);
      expect(res.body.data.order.cryptocurrency).toBe('BTC');
    });

    it('should create an order without authentication', async () => {
      if (!global.isConnected()) return;

      const orderData = {
        productId: testProduct._id.toString(),
        quantity: 1,
        customerEmail: 'guest@test.com',
        cryptocurrency: 'ETH'
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order).toBeDefined();
      expect(res.body.data.order.user).toBeNull();
    });

    it('should return error for insufficient stock', async () => {
      if (!global.isConnected()) return;

      const orderData = {
        productId: testProduct._id.toString(),
        quantity: 100,
        customerEmail: 'customer@test.com',
        cryptocurrency: 'BTC'
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Insufficient stock');
    });

    it('should return error for invalid product', async () => {
      if (!global.isConnected()) return;

      const orderData = {
        productId: '507f1f77bcf86cd799439011',
        quantity: 1,
        customerEmail: 'customer@test.com',
        cryptocurrency: 'BTC'
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Product not found');
    });

    it('should return error for unsupported cryptocurrency', async () => {
      if (!global.isConnected()) return;

      const orderData = {
        productId: testProduct._id.toString(),
        quantity: 1,
        customerEmail: 'customer@test.com',
        cryptocurrency: 'DOGE'
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should validate required fields', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .post('/api/orders')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/orders/:id', () => {
    let testOrder;

    beforeEach(async () => {
      if (!global.isConnected()) return;

      testOrder = await Order.create({
        user: regularUser._id,
        customerEmail: 'customer@test.com',
        items: [{
          product: testProduct._id,
          productName: testProduct.name,
          quantity: 1,
          price: testProduct.price,
          priceUSD: testProduct.priceUSD
        }],
        totalPrice: testProduct.price,
        totalPriceUSD: testProduct.priceUSD,
        cryptocurrency: 'BTC',
        paymentAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        status: 'pending'
      });
    });

    it('should get order by ID (own order)', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get(`/api/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order).toBeDefined();
      expect(res.body.data.order._id).toBe(testOrder._id.toString());
    });

    it('should get order by ID (admin)', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get(`/api/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order).toBeDefined();
    });

    it('should not get other user order', async () => {
      if (!global.isConnected()) return;

      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@test.com',
        password: 'password123'
      });
      const otherToken = generateToken(otherUser._id);

      const res = await request(app)
        .get(`/api/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should return error for non-existent order', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/orders/my-orders', () => {
    beforeEach(async () => {
      if (!global.isConnected()) return;

      // Create multiple orders for user
      await Order.create([
        {
          user: regularUser._id,
          customerEmail: 'customer@test.com',
          items: [{
            product: testProduct._id,
            productName: testProduct.name,
            quantity: 1,
            price: testProduct.price,
            priceUSD: testProduct.priceUSD
          }],
          totalPrice: testProduct.price,
          totalPriceUSD: testProduct.priceUSD,
          cryptocurrency: 'BTC',
          paymentAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          status: 'pending'
        },
        {
          user: regularUser._id,
          customerEmail: 'customer@test.com',
          items: [{
            product: testProduct._id,
            productName: testProduct.name,
            quantity: 2,
            price: testProduct.price,
            priceUSD: testProduct.priceUSD
          }],
          totalPrice: testProduct.price * 2,
          totalPriceUSD: testProduct.priceUSD * 2,
          cryptocurrency: 'ETH',
          paymentAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          status: 'paid'
        }
      ]);
    });

    it('should get user orders', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders/my-orders')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.orders).toBeDefined();
      expect(res.body.data.orders.length).toBeGreaterThanOrEqual(2);
    });

    it('should require authentication', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders/my-orders');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/orders (Admin)', () => {
    beforeEach(async () => {
      if (!global.isConnected()) return;

      // Create test orders
      await Order.create([
        {
          user: regularUser._id,
          customerEmail: 'customer1@test.com',
          items: [{
            product: testProduct._id,
            productName: testProduct.name,
            quantity: 1,
            price: testProduct.price,
            priceUSD: testProduct.priceUSD
          }],
          totalPrice: testProduct.price,
          totalPriceUSD: testProduct.priceUSD,
          cryptocurrency: 'BTC',
          paymentAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          status: 'pending'
        },
        {
          user: regularUser._id,
          customerEmail: 'customer2@test.com',
          items: [{
            product: testProduct._id,
            productName: testProduct.name,
            quantity: 1,
            price: testProduct.price,
            priceUSD: testProduct.priceUSD
          }],
          totalPrice: testProduct.price,
          totalPriceUSD: testProduct.priceUSD,
          cryptocurrency: 'ETH',
          paymentAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          status: 'paid'
        }
      ]);
    });

    it('should get all orders (admin)', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.orders).toBeDefined();
      expect(res.body.data.pagination).toBeDefined();
    });

    it('should filter orders by status', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders?status=pending')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.orders).toBeDefined();
      expect(res.body.data.orders.every(o => o.status === 'pending')).toBe(true);
    });

    it('should not allow regular user to access', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .get('/api/orders');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/orders/:id/status (Admin)', () => {
    let testOrder;

    beforeEach(async () => {
      if (!global.isConnected()) return;

      testOrder = await Order.create({
        user: regularUser._id,
        customerEmail: 'customer@test.com',
        items: [{
          product: testProduct._id,
          productName: testProduct.name,
          quantity: 1,
          price: testProduct.price,
          priceUSD: testProduct.priceUSD
        }],
        totalPrice: testProduct.price,
        totalPriceUSD: testProduct.priceUSD,
        cryptocurrency: 'BTC',
        paymentAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        status: 'pending'
      });
    });

    it('should update order status (admin)', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .put(`/api/orders/${testOrder._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order.status).toBe('shipped');
    });

    it('should not allow regular user to update status', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .put(`/api/orders/${testOrder._id}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'shipped' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .put(`/api/orders/${testOrder._id}/status`)
        .send({ status: 'shipped' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return error for non-existent order', async () => {
      if (!global.isConnected()) return;

      const res = await request(app)
        .put('/api/orders/507f1f77bcf86cd799439011/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
