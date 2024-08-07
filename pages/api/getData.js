import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/conversation.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // console.log(`Reading file from path: ${filePath}`); // Log the file path
      const data = await fs.readFile(filePath, 'utf8');
      const conversationData = JSON.parse(data);

      res.status(200).json({ message: 'User data processed successfully', conversationData });
    } catch (error) {
      console.error('Error reading file', error);
      res.status(500).json({ message: 'Error reading conversation data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
