const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/send-text', async (req, res) => {
  const { message, to } = req.body;
  
  console.log(`Sending text to ${to}: ${message}`);
  
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: '+18782050398',
      to: to
    });
    
    console.log(`Text sent successfully. SID: ${result.sid}`);
    res.json({ success: true, messageSid: result.sid });
  } catch (error) {
    console.error('Error sending text:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/save-assessment', async (req, res) => {
  const assessmentData = req.body;
  
  console.log('Assessment data received:', JSON.stringify(assessmentData, null, 2));
  
  try {
    const enrichedData = {
      ...assessmentData,
      assessment_metadata: {
        ...assessmentData.assessment_metadata,
        assessment_date: new Date().toISOString(),
        channel: 'SMS'
      }
    };
    
    console.log('Assessment saved successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HRA Text Backend running on port ${PORT}`);
});
