import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, to } = req.body;

  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: '+18782050398',
      to: to
    });

    console.log(`Text sent successfully. SID: ${result.sid}`);
    res.status(200).json({ success: true, messageSid: result.sid });
  } catch (error) {
    console.error('Error sending text:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
