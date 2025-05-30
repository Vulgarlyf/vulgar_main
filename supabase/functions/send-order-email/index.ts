
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

interface OrderEmailRequest {
  items: OrderItem[];
  total: number;
  customerEmail: string;
  customerName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, total, customerEmail, customerName }: OrderEmailRequest = await req.json();
    
    console.log("Processing order email for:", customerEmail);
    console.log("Order total:", total);
    console.log("Items count:", items.length);

    // Create order details HTML for both emails
    const orderItemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-family: Arial, sans-serif;">${item.name}</td>
        <td style="padding: 12px; font-family: Arial, sans-serif;">Size: ${item.size}, Color: ${item.color}</td>
        <td style="padding: 12px; font-family: Arial, sans-serif; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; font-family: Arial, sans-serif; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; font-family: Arial, sans-serif; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email to store owner (vulgarlyf@gmail.com)
    const storeOwnerEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #16a34a; margin-bottom: 20px;">🛍️ New Order Received!</h1>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #333;">Order Details</h2>
          <p><strong>Date:</strong> ${orderDate}</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          ${customerName ? `<p><strong>Customer Name:</strong> ${customerName}</p>` : ''}
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #16a34a; color: white;">
              <th style="padding: 12px; text-align: left;">Product</th>
              <th style="padding: 12px; text-align: left;">Details</th>
              <th style="padding: 12px; text-align: center;">Qty</th>
              <th style="padding: 12px; text-align: right;">Price</th>
              <th style="padding: 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h3 style="margin: 0; color: #16a34a;">Order Total: $${total.toFixed(2)}</h3>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          This is an automated notification from your Vulgar Collection store.
        </p>
      </div>
    `;

    // Email to customer
    const customerReceiptEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #16a34a; margin-bottom: 20px;">Thank you for your order!</h1>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hi ${customerName || 'there'}! We've received your order and are getting it ready for you.
        </p>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #333;">Order Summary</h2>
          <p><strong>Order Date:</strong> ${orderDate}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #16a34a; color: white;">
              <th style="padding: 12px; text-align: left;">Product</th>
              <th style="padding: 12px; text-align: left;">Details</th>
              <th style="padding: 12px; text-align: center;">Qty</th>
              <th style="padding: 12px; text-align: right;">Price</th>
              <th style="padding: 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; padding: 20px; background: #f9f9f9; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="margin: 0; color: #16a34a;">Order Total: $${total.toFixed(2)}</h3>
        </div>

        <div style="background: #16a34a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">What's Next?</h3>
          <p style="margin-bottom: 0;">
            You'll receive a shipping confirmation email with tracking information once your order ships. 
            If you have any questions, feel free to contact us.
          </p>
        </div>

        <p style="color: #666; font-size: 14px; text-align: center;">
          Thank you for shopping with Vulgar Collection!<br>
          Bold streetwear for those who dare to be different.
        </p>
      </div>
    `;

    // Send email to store owner
    const storeOwnerResponse = await resend.emails.send({
      from: "Vulgar Collection <onboarding@resend.dev>",
      to: ["vulgarlyf@gmail.com"],
      subject: `🛍️ New Order - $${total.toFixed(2)} from ${customerEmail}`,
      html: storeOwnerEmail,
    });

    console.log("Store owner email sent:", storeOwnerResponse);

    // Send receipt to customer
    const customerResponse = await resend.emails.send({
      from: "Vulgar Collection <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Your Vulgar Collection Order Confirmation",
      html: customerReceiptEmail,
    });

    console.log("Customer email sent:", customerResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      storeOwnerEmail: storeOwnerResponse,
      customerEmail: customerResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
