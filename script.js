const templateButtonsContainer = document.getElementById('template-buttons');
const searchBar = document.getElementById('search-bar');
let templates = []; 

// Fetch templates
fetch('templates.json')
  .then(response => response.json())
  .then(data => {
    templates = data;
    renderTemplateButtons(templates);
  })
  .catch(error => console.error('Error loading templates:', error));

// Render buttons
function renderTemplateButtons(templatesToDisplay) {
  templateButtonsContainer.innerHTML = ''; 

  templatesToDisplay.forEach(template => {
    const button = document.createElement('button');
    button.classList.add('template-button');
    // Use template name for the button text
    button.textContent = template.name; 
    button.addEventListener('click', () => {
      copyToClipboard(template.content);
      button.textContent = 'Copied!';
      setTimeout(() => button.textContent = template.name, 1500);
    });
    templateButtonsContainer.appendChild(button);
  });
}

// Copy to clipboard (no changes needed here)
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
}

// Search 
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredTemplates = templates.filter(template => {
        return template.name.toLowerCase().includes(searchTerm) ||
               template.content.toLowerCase().includes(searchTerm);
  });
  renderTemplateButtons(filteredTemplates);
  
  const manageButton = document.getElementById('manage-button');

 manageButton.addEventListener('click', () => {
   window.location.href = '/manage'; // Redirect to /manage
 });
});