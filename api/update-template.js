const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { name, content } = req.body;
      console.log("Received request body:", req.body); // Log the received body

      // Validate input
      if (!name || !content) {
        return res.status(400).json({ message: 'Invalid input: name and content are required' });
      }

      const filePath = path.join(process.cwd(), 'templates.json');
      console.log("File path:", filePath); // Log the file path

      const templatesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log("Templates data (before update):", templatesData); // Log data before update

      const templateIndex = templatesData.findIndex(t => t.name === name);
      if (templateIndex !== -1) {
        templatesData[templateIndex] = { name, content };
        fs.writeFileSync(filePath, JSON.stringify(templatesData, null, 2));
        console.log("Templates data (after update):", templatesData); // Log data after update
        res.status(200).json({ message: 'Template updated successfully' });
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    } catch (error) {
      console.error("Error updating template:", error); // Log the full error object
      res.status(500).json({ message: 'Error updating template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};