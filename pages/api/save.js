// import { promises as fs } from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'data/conversation.json');

// export default async function handler(req, res) {
//   const method = req.method;

//   if (method === 'GET') {
//     try {
//       console.log(`Reading file from path: ${filePath}`);
//       const data = await fs.readFile(filePath, 'utf8');
//       const conversationData = JSON.parse(data);

//       res.status(200).json({ message: 'User data processed successfully', conversationData });
//     } catch (error) {
//       console.error('Error reading file', error);
//       res.status(500).json({ message: 'Error reading conversation data', error: error.message });
//     }
//   } else if (method === 'POST') {
//     try {
//       const { messageStore, prompt_Generated } = req.body;

//       if (!Array.isArray(messageStore) || typeof prompt_Generated !== 'string') {
//         return res.status(400).json({ message: 'Invalid data format' });
//       }

//       let conversations = [];

//       // Read the file if it exists
//       try {
//         const data = await fs.readFile(filePath, 'utf8');
//         conversations = JSON.parse(data);
//         if (!Array.isArray(conversations)) {
//           conversations = [];
//         }
//       } catch (error) {
//         if (error.code !== 'ENOENT') {
//           throw error;
//         }
//         // If file does not exist, initialize conversations as an empty array
//         conversations = [];
//       }

//       // Push the new conversation to the array
//       conversations.push({ messageStore, prompt_Generated });

//       // Write the updated data to the file
//       await fs.writeFile(filePath, JSON.stringify(conversations, null, 2), 'utf8');

//       res.status(200).json({ message: 'Data inserted successfully!!!', data: conversations.length });
//     } catch (error) {
//       console.error('Error saving file', error);
//       res.status(500).json({ message: 'Error saving conversation data', error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/conversation.json');

export default async function handler(req, res) {
  const method = req.method;

  if (method === 'GET') {
    try {
      console.log(`Reading file from path: ${filePath}`);
      const data = await fs.readFile(filePath, 'utf8');
      const conversationData = JSON.parse(data);

      res.status(200).json({ message: 'User data processed successfully', conversationData });
    } catch (error) {
      console.error('Error reading file', error);
      res.status(500).json({ message: 'Error reading conversation data', error: error.message });
    }
  } else if (method === 'POST') {
    try {
      const { messageStore, prompt_Generated } = req.body;

      if (!Array.isArray(messageStore) || typeof prompt_Generated !== 'string') {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      let conversations = [];

      // Read the file if it exists
      try {
        const data = await fs.readFile(filePath, 'utf8');
        conversations = JSON.parse(data);
        if (!Array.isArray(conversations)) {
          conversations = [];
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
        // If file does not exist, initialize conversations as an empty array
        conversations = [];
      }

      // Push the new conversation to the array
      conversations.push({ messageStore, prompt_Generated });

      // Write the updated data to the file
      await fs.writeFile(filePath, JSON.stringify(conversations, null, 2), 'utf8');

      res.status(200).json({ message: 'Data inserted successfully!!!', data: conversations.length });
    } catch (error) {
      console.error('Error saving file', error);
      res.status(500).json({ message: 'Error saving conversation data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
