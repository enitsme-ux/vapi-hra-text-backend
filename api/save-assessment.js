export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const assessmentData = req.body;

  try {
    const enrichedData = {
      ...assessmentData,
      assessment_metadata: {
        ...assessmentData.assessment_metadata,
        assessment_date: new Date().toISOString(),
        channel: 'SMS'
      }
    };

    console.log('Assessment saved:', JSON.stringify(enrichedData, null, 2));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
```

4. Click **"Commit new file"**

---

## After Creating All 3 Files:

Vercel will automatically redeploy. Wait 1-2 minutes, then test:
```
https://vapi-hra-text-backend.vercel.app/api/health
