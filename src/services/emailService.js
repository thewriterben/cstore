const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

/**
 * Email Service for sending transactional emails
 * Supports multiple email providers via SMTP
 */

// Create reusable transporter
let transporter = null;

/**
 * Initialize email transporter
 */
function initializeTransporter() {
  if (transporter) {
    return transporter;
  }

  // Check if email is configured
  if (!process.env.SMTP_HOST) {
    logger.warn('Email service not configured. SMTP_HOST is missing.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    }
  });

  logger.info('Email transporter initialized');
  return transporter;
}

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content (optional)
 * @returns {Promise<Object>} - Send result
 */
async function sendEmail({ to, subject, html, text }) {
  try {
    const emailTransporter = initializeTransporter();
    
    if (!emailTransporter) {
      logger.warn('Email not sent - service not configured');
      return {
        success: false,
        message: 'Email service not configured'
      };
    }

    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME || 'CStore'} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || stripHtml(html)
    };

    const info = await emailTransporter.sendMail(mailOptions);
    
    logger.info(`Email sent: ${info.messageId} to ${to}`);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    logger.error('Email send error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Send welcome email to new users
 * @param {string} email - User email
 * @param {string} name - User name
 */
async function sendWelcomeEmail(email, name) {
  const subject = 'Welcome to CStore!';
  const html = getWelcomeEmailTemplate(name);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send email verification email
 * @param {string} email - User email
 * @param {string} name - User name
 * @param {string} verificationToken - Verification token
 */
async function sendVerificationEmail(email, name, verificationToken) {
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${verificationToken}`;
  const subject = 'Verify Your Email - CStore';
  const html = getVerificationEmailTemplate(name, verificationUrl);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} name - User name
 * @param {string} resetToken - Reset token
 */
async function sendPasswordResetEmail(email, name, resetToken) {
  const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request - CStore';
  const html = getPasswordResetEmailTemplate(name, resetUrl);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send order confirmation email
 * @param {string} email - Customer email
 * @param {Object} order - Order details
 */
async function sendOrderConfirmationEmail(email, order) {
  const subject = `Order Confirmation #${order.orderNumber || order._id}`;
  const html = getOrderConfirmationTemplate(order);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send payment confirmation email
 * @param {string} email - Customer email
 * @param {Object} order - Order details
 * @param {Object} payment - Payment details
 */
async function sendPaymentConfirmationEmail(email, order, payment) {
  const subject = `Payment Received - Order #${order.orderNumber || order._id}`;
  const html = getPaymentConfirmationTemplate(order, payment);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send shipping notification email
 * @param {string} email - Customer email
 * @param {Object} order - Order details
 * @param {string} trackingNumber - Tracking number (optional)
 */
async function sendShippingNotificationEmail(email, order, trackingNumber) {
  const subject = `Your Order Has Been Shipped - Order #${order.orderNumber || order._id}`;
  const html = getShippingNotificationTemplate(order, trackingNumber);
  
  return await sendEmail({ to: email, subject, html });
}

/**
 * Send admin alert email
 * @param {string} subject - Alert subject
 * @param {string} message - Alert message
 * @param {Object} data - Additional data
 */
async function sendAdminAlert(subject, message, data = {}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    logger.warn('Admin email not configured');
    return { success: false, message: 'Admin email not configured' };
  }

  const html = getAdminAlertTemplate(subject, message, data);
  
  return await sendEmail({ 
    to: adminEmail, 
    subject: `[CStore Alert] ${subject}`, 
    html 
  });
}

// Email Templates

function getWelcomeEmailTemplate(name) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
        .button { display: inline-block; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🪙 Welcome to CStore</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for joining CStore, the cryptocurrency marketplace.</p>
          <p>You can now start browsing products and making purchases using Bitcoin, Ethereum, or USDT.</p>
          <p>
            <a href="${process.env.APP_URL || 'http://localhost:3000'}" class="button">Browse Products</a>
          </p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Happy shopping!</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getVerificationEmailTemplate(name, verificationUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
        .button { display: inline-block; padding: 10px 20px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Verify Your Email</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Please verify your email address to complete your registration.</p>
          <p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p><small>${verificationUrl}</small></p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getPasswordResetEmailTemplate(name, resetUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e74c3c; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
        .button { display: inline-block; padding: 10px 20px; background: #e74c3c; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔑 Password Reset</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <p>
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p><small>${resetUrl}</small></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getOrderConfirmationTemplate(order) {
  const productsList = order.items ? order.items.map(item => `
    <tr>
      <td>${item.product?.name || 'Product'}</td>
      <td>${item.quantity}</td>
      <td>$${(item.priceUSD * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('') : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #34495e; color: white; }
        .total { font-weight: bold; font-size: 1.2em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 Order Confirmation</h1>
        </div>
        <div class="content">
          <h2>Order #${order.orderNumber || order._id}</h2>
          <p>Thank you for your order! Here are the details:</p>
          
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${productsList}
              <tr class="total">
                <td colspan="2">Total</td>
                <td>$${order.totalPriceUSD?.toFixed(2) || '0.00'}</td>
              </tr>
            </tbody>
          </table>

          <h3>Payment Details</h3>
          <p>
            <strong>Cryptocurrency:</strong> ${order.cryptocurrency}<br>
            <strong>Amount:</strong> ${order.totalPrice} ${order.cryptocurrency}<br>
            <strong>Payment Address:</strong> ${order.paymentAddress}
          </p>

          <p>Please send the exact amount to the address above to complete your order.</p>
          
          <p>Status: <strong>${order.status}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getPaymentConfirmationTemplate(order, payment) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #27ae60; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Received</h1>
        </div>
        <div class="content">
          <h2>Order #${order.orderNumber || order._id}</h2>
          <p>Great news! We've received your payment.</p>
          
          <h3>Payment Details</h3>
          <p>
            <strong>Transaction Hash:</strong> ${payment.transactionHash}<br>
            <strong>Amount:</strong> ${payment.amount} ${payment.cryptocurrency}<br>
            <strong>Status:</strong> ${payment.status}
          </p>

          <p>Your order is now being processed and will be shipped soon.</p>
          <p>You will receive another email when your order has been shipped.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getShippingNotificationTemplate(order, trackingNumber) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3498db; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚚 Order Shipped</h1>
        </div>
        <div class="content">
          <h2>Order #${order.orderNumber || order._id}</h2>
          <p>Good news! Your order has been shipped.</p>
          
          ${trackingNumber ? `
            <h3>Tracking Information</h3>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
          ` : ''}

          <p>Your order should arrive within 5-7 business days.</p>
          <p>Thank you for shopping with CStore!</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getAdminAlertTemplate(subject, message, data) {
  const dataHtml = Object.keys(data).length > 0 ? `
    <h3>Additional Data:</h3>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e74c3c; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f4f4f4; }
        pre { background: #fff; padding: 10px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Admin Alert</h1>
        </div>
        <div class="content">
          <h2>${subject}</h2>
          <p>${message}</p>
          ${dataHtml}
          <p><small>Generated at: ${new Date().toISOString()}</small></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Strip HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} - Plain text
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Verify email configuration
 * @returns {Promise<boolean>} - Configuration status
 */
async function verifyEmailConfig() {
  try {
    const emailTransporter = initializeTransporter();
    
    if (!emailTransporter) {
      return false;
    }

    await emailTransporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed:', error);
    return false;
  }
}

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendPaymentConfirmationEmail,
  sendShippingNotificationEmail,
  sendAdminAlert,
  verifyEmailConfig
};
