import twilio from "twilio";

// Initialize Twilio client only if credentials exist
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Sends a WhatsApp notification to the customer when their order status changes.
 */
export async function sendOrderStatusWhatsApp(
  customerPhone: string,
  customerName: string,
  orderId: string,
  status: string
) {
  if (!client || !fromNumber) {
    console.log(
      "[WhatsApp] Skipping notification: Twilio credentials not configured in environment variables."
    );
    return;
  }

  // Format phone number to E.164 format if not already (Twilio requires this)
  // Assuming customerPhone might be like "555-1234", we strip non-digits. 
  // In a real app, you'd ensure the phone number is collected with country code (e.g. +1).
  let formattedPhone = customerPhone.replace(/[^\d+]/g, '');
  if (!formattedPhone.startsWith('+')) {
    // Default to US country code if none provided for testing
    formattedPhone = `+1${formattedPhone}`;
  }

  const shortOrderId = orderId.slice(-8).toUpperCase();
  const firstName = customerName.split(" ")[0];

  let message = `Hi ${firstName}! `;

  switch (status) {
    case "CONFIRMED":
      message += `Great news! Your Dualat Kids Wear order #${shortOrderId} has been confirmed. We're getting it ready for you!`;
      break;
    case "SHIPPED":
      message += `Your order #${shortOrderId} has just shipped! 🚚 It's on its way to you now.`;
      break;
    case "DELIVERED":
      message += `Yay! Your order #${shortOrderId} has been delivered. We hope you and your little one love it! ❤️`;
      break;
    case "CANCELLED":
      message += `Your order #${shortOrderId} has been cancelled. If you have any questions, please contact our support team.`;
      break;
    default:
      message += `Your order #${shortOrderId} status has been updated to: ${status}.`;
      break;
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${formattedPhone}`,
    });
    console.log(`[WhatsApp] Sent message to ${formattedPhone}. SID: ${response.sid}`);
  } catch (error) {
    console.error(`[WhatsApp] Failed to send message to ${formattedPhone}:`, error);
  }
}
