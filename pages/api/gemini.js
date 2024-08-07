// pages/api/gemini.js

export default async function handler(req, res) {
    try {
      if (req.method === 'POST') {
        // Extract messageStore from the request body
        const { messageStore } = req.body;
  
        // Validate input
        if (!Array.isArray(messageStore)) {
          return res.status(400).json({ error: 'Invalid input format' });
        }
  
        // Replace this with your actual logic to generate the resume
        const generatedResume = generateResume(messageStore);
  
        // Send response
        res.status(200).json({ generatedResume });
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
      console.error('Error in /api/gemini:', error); // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Example function to generate a resume (replace with actual logic)
  function generateResume(messageStore) {
    // Dummy implementation: concatenate all messages as a sample resume
    return messageStore.map(entry => entry.response).join('\n\n');
  }
  