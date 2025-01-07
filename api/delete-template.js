import { db } from '../public/firebaseConfig.js'; // Correct path
import { ref, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// ... rest of your api/delete-template.js code ...

// ... rest of your api/delete-template.js code

module.exports = async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({ message: 'Invalid input: name is required' });
      }

      // Delete the template from Firebase
      const templateRef = ref(db, `templates/${name}`);
      await remove(templateRef);

      res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ message: 'Error deleting template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};