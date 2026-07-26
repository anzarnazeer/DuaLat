import twilio from "twilio";

// These variables must be set in your .env or Vercel environment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

export async function sendWhatsAppUpdate(
  customerPhone: string,
  customerName: string,
  orderId: string,
  status: string
) {
  if (!accountSid || !authToken || !twilioWhatsAppNumber) {
    console.warn("Twilio credentials missing. Skipping WhatsApp notification.");
    return false;
  }

  try {
    const client = twilio(accountSid, authToken);
    
    // Format the phone number. Twilio requires E.164 format (e.g., +1234567890)
    // We assume the user entered their number with country code, if not, you might need a parsing library.
    const formattedPhone = customerPhone.startsWith('+') ? customerPhone : `+${customerPhone.replace(/\D/g, '')}`;

    let messageBody = `Hi ${customerName},\n\nUpdate on your DuaLat order #${orderId.slice(-8).toUpperCase()}:\n`;
    
    switch (status) {
      case "CONFIRMED":
        messageBody += `Your order has been confirmed and is being processed! We will notify you when it ships. 📦✨`;
        break;
      case "SHIPPED":
        messageBody += `Great news! Your order has shipped and is on its way to you. 🚚💨`;
        break;
      case "DELIVERED":
        messageBody += `Your order has been delivered! We hope you and your little one love the clothes. 🧸💖`;
        break;
      case "CANCELLED":
        messageBody += `Your order has been cancelled. If this was a mistake, please contact our support. 🛑`;
        break;
      default:
        messageBody += `Your order status is now: ${status}`;
        break;
    }

    messageBody += `\n\nThank you for shopping with DuaLat Kids Wear! 🌿`;

    const message = await client.messages.create({
      body: messageBody,
      from: twilioWhatsAppNumber, // This must be a Twilio WhatsApp Sandbox or verified number
      to: `whatsapp:${formattedPhone}`
    });

    console.log(`WhatsApp message sent to ${formattedPhone}. SID: ${message.sid}`);
    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}
