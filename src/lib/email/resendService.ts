import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_mock_key';
const resend = new Resend(resendApiKey);

export interface EmailOrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: { productName: string; size: number; color: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
}

export const resendService = {
  // 1. Order Confirmation Email to Customer
  async sendOrderConfirmation(order: EmailOrderDetails) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Mock Resend Email] Order Confirmation sent to ${order.customerEmail} for #${order.orderNumber}`);
      return { success: true, mock: true };
    }

    try {
      const htmlContent = `
        <div style="background-color: #FAF7F2; padding: 30px; font-family: 'Times New Roman', serif; color: #1F130E;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E2D7C7; padding: 40px;">
            <div style="text-align: center; border-bottom: 2px solid #C59B27; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #1F130E; letter-spacing: 3px; text-transform: uppercase; font-size: 24px; margin: 0;">Tatheer Chappalz</h1>
              <p style="color: #C59B27; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Namak Mandi • Peshawar, Pakistan</p>
            </div>
            
            <h2 style="font-size: 20px; color: #1F130E; margin-bottom: 15px;">Order Confirmation #${order.orderNumber}</h2>
            <p style="font-size: 14px; color: #4A2E1D; line-height: 1.6;">
              Dear <strong>${order.customerName}</strong>,<br/>
              Thank you for ordering with Tatheer Chappalz. Our master cobblers in Peshawar have received your request and are preparing your handcrafted footwear.
            </p>

            <div style="background-color: #FAF7F2; padding: 20px; border: 1px solid #E2D7C7; margin: 25px 0;">
              <h3 style="font-size: 14px; text-transform: uppercase; color: #C59B27; margin: 0 0 15px 0;">Order Summary</h3>
              ${order.items.map(item => `
                <div style="display: flex; justify-content: space-between; font-size: 13px; border-bottom: 1px border #E2D7C7; padding: 8px 0;">
                  <span><strong>${item.productName}</strong> (EU ${item.size} • ${item.color}) x${item.quantity}</span>
                  <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              `).join('')}
              <div style="margin-top: 15px; pt: 10px; border-top: 1px solid #E2D7C7; font-size: 13px;">
                <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>Rs. ${order.subtotal.toLocaleString()}</span></div>
                ${order.discount > 0 ? `<div style="display: flex; justify-content: space-between; color: green;"><span>Discount:</span> <span>-Rs. ${order.discount.toLocaleString()}</span></div>` : ''}
                <div style="display: flex; justify-content: space-between;"><span>Shipping:</span> <span>${order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping}`}</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #1F130E; margin-top: 10px;"><span>Total:</span> <span>Rs. ${order.total.toLocaleString()}</span></div>
              </div>
            </div>

            <p style="font-size: 12px; color: #4A2E1D;">Payment Method: <strong>${order.paymentMethod}</strong></p>
            <p style="font-size: 12px; color: #4A2E1D;">Shipping Address: ${order.shippingAddress}</p>

            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E2D7C7; font-size: 11px; color: #888;">
              © 2026 Tatheer Chappalz. All Rights Reserved. Crafted with pride in Peshawar.
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'Tatheer Chappalz <orders@tatheerchappalz.com>',
        to: order.customerEmail,
        subject: `Order Confirmed: #${order.orderNumber} - Tatheer Chappalz`,
        html: htmlContent,
      });

      await resend.emails.send({
        from: 'Tatheer System <admin@tatheerchappalz.com>',
        to: 'orders@tatheerchappalz.com',
        subject: `🚨 New Order Alert: #${order.orderNumber} (Rs. ${order.total.toLocaleString()})`,
        html: `<p>New order received for ${order.customerName} (${order.customerPhone || 'N/A'}). Total: Rs. ${order.total.toLocaleString()}</p>`,
      });

      return { success: true };
    } catch (e) {
      console.error('Error sending Resend email:', e);
      return { success: false, error: e };
    }
  },

  // 2. Order Status Update Email
  async sendStatusUpdate(customerEmail: string, orderNumber: string, status: string, trackingNumber?: string) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Mock Resend Email] Status update to ${status} for #${orderNumber}`);
      return { success: true, mock: true };
    }

    try {
      await resend.emails.send({
        from: 'Tatheer Chappalz <orders@tatheerchappalz.com>',
        to: customerEmail,
        subject: `Order #${orderNumber} Status Update: ${status}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1F130E;">
            <h2>Your Order Status Has Been Updated</h2>
            <p>Your order <strong>#${orderNumber}</strong> is now: <strong>${status}</strong>.</p>
            ${trackingNumber ? `<p>Tracking Reference: <strong>${trackingNumber}</strong></p>` : ''}
            <p>Thank you for choosing Tatheer Chappalz.</p>
          </div>
        `,
      });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
};
