import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, get, child, set, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { db } from './public/firebaseConfig.js';

// ... rest of your script.js code

const templateButtonsContainer = document.getElementById('template-buttons');
const searchBar = document.getElementById('search-bar');
const manageButton = document.getElementById('manage-button');
let templates = [];

manageButton.addEventListener('click', () => {
  window.location.href = '/manage'; // Redirect to /manage
});

async function fetchTemplates() {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `templates`));
    if (snapshot.exists()) {
      templates = Object.values(snapshot.val());
    } else {
      console.log("No templates available");
      templates = [];
    }
  } catch (error) {
    console.error("Error fetching templates: ", error);
    templates = [];
  }
}

// Render buttons
async function renderTemplateButtons(templatesToDisplay) {
  await fetchTemplates();
  templateButtonsContainer.innerHTML = '';

  const displayTemplates = templatesToDisplay || templates;

  displayTemplates.forEach(template => {
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
});

renderTemplateButtons();