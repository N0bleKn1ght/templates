import { db } from '../firebaseConfig';
import { ref, remove } from 'firebase/database';

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