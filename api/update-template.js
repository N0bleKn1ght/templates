import { db } from './firebaseConfig.js'; // Correct path
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// ... rest of your api/update-template.js code ...

// ... rest of your api/update-template.js code

module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { name, content } = req.body;

      if (!name || !content) {
        return res.status(400).json({ message: 'Invalid input: name and content are required' });
      }

      // Update the template in Firebase
      const templateRef = ref(db, `templates/${name}`);
      await set(templateRef, { name, content });

      res.status(200).json({ message: 'Template updated successfully' });
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ message: 'Error updating template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};