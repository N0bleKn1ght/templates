const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const { name } = req.query;
      console.log("Received name to delete:", name); // Log the received name

      // Validate input
      if (!name) {
        return res.status(400).json({ message: 'Invalid input: name is required' });
      }

      const filePath = path.join(process.cwd(), 'templates.json');
      console.log("File path:", filePath); // Log the file path

      const templatesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log("Templates data (before delete):", templatesData); // Log data before deletion

      const updatedTemplates = templatesData.filter(t => t.name !== name);

      if (updatedTemplates.length < templatesData.length) {
        fs.writeFileSync(filePath, JSON.stringify(updatedTemplates, null, 2));
        console.log("Templates data (after delete):", updatedTemplates); // Log data after deletion
        res.status(200).json({ message: 'Template deleted successfully' });
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    } catch (error) {
      console.error("Error deleting template:", error); // Log the full error object
      res.status(500).json({ message: 'Error deleting template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};