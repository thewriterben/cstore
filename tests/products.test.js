const request = require('supertest');
const app = require('../src/app');
const Product = require('../src/models/Product');
const User = require('../src/models/User');

describe('Products API', () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    // Create admin user
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123'
      });

    // Manually set admin role
    await User.findByIdAndUpdate(adminRes.body.data.user.id, { role: 'admin' });
    
    // Login as admin to get fresh token
    const adminLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      });
    
    adminToken = adminLoginRes.body.data.token;

    // Create regular user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user123'
      });

    userToken = userRes.body.data.token;
  });

  describe('GET /api/products', () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: 'Product 1',
          description: 'Description 1',
          price: 0.001,
          priceUSD: 50,
          stock: 10
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          price: 0.002,
          priceUSD: 100,
          stock: 5
        }
      ]);
    });

    it('should get all active products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.products).toHaveLength(2);
    });

    it('should filter products by price', async () => {
      const res = await request(app)
        .get('/api/products')
        .query({ minPrice: 75 });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.products).toHaveLength(1);
      expect(res.body.data.products[0].priceUSD).toBe(100);
    });
  });

  describe('POST /api/products', () => {
    it('should allow admin to create product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Product',
          description: 'New product description',
          price: 0.005,
          priceUSD: 250,
          stock: 20
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.product.name).toBe('New Product');
    });

    it('should not allow regular user to create product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'New Product',
          description: 'New product description',
          price: 0.005,
          priceUSD: 250,
          stock: 20
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Product'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
