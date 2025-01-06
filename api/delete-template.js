const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const { name } = req.query;
      const filePath = path.join(process.cwd(), 'templates.json');
      const templatesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      const updatedTemplates = templatesData.filter(t => t.name !== name);

      if (updatedTemplates.length < templatesData.length) {
        fs.writeFileSync(filePath, JSON.stringify(updatedTemplates, null, 2));
        res.status(200).json({ message: 'Template deleted successfully' });
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting template' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};