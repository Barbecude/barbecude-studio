/**
 * Utility to send WhatsApp messages automatically via Fonnte Gateway.
 * You can switch the endpoint to Wablas, Watzap, etc., if you use a different provider.
 */

const FONNTE_API_URL = 'https://api.fonnte.com/send';

export async function sendWhatsAppMessage(targetPhone: string, message: string) {
  const token = process.env.FONNTE_TOKEN;

  if (!token) {
    console.warn("FONNTE_TOKEN is not set in environment variables. Cannot send WhatsApp message.");
    return false;
  }

  if (!targetPhone) {
    console.warn("Target phone is empty. Cannot send WhatsApp message.");
    return false;
  }

  // Optional: Sanitize phone number to standard format (e.g., replace leading 0 with 62)
  let cleanPhone = targetPhone.replace(/\D/g, ''); // remove non-digits
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.substring(1);
  }

  try {
    const response = await fetch(FONNTE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: new URLSearchParams({
        target: cleanPhone,
        message: message,
        delay: '2', // Optional 2s delay
        countryCode: '62'
      })
    });

    const data = await response.json();
    
    if (data.status) {
      console.log(`WhatsApp message sent successfully to ${cleanPhone}.`);
      return true;
    } else {
      console.error(`Failed to send WA message: ${data.reason}`);
      return false;
    }
  } catch (error) {
    console.error("Error connecting to Fonnte WA Gateway:", error);
    return false;
  }
}
