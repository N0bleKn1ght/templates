const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { name, content } = req.body;
      const filePath = path.join(process.cwd(), 'templates.json');
      const templatesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      const templateIndex = templatesData.findIndex(t => t.name === name);
      if (templateIndex !== -1) {
        templatesData[templateIndex] = { name, content };
        fs.writeFileSync(filePath, JSON.stringify(templatesData, null, 2));
        res.status(200).json({ message: 'Template updated successfully' });
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};