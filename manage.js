const templateList = document.getElementById('template-list');

// Fetch and display templates
async function loadTemplates() {
  const response = await fetch('templates.json');
  const templates = await response.json();

  templateList.innerHTML = ''; // Clear existing content

  templates.forEach(template => {
    const templateItem = document.createElement('div');
    templateItem.classList.add('template-item');
    templateItem.innerHTML = `
      <h3>${template.name}</h3>
      <p>${template.content}</p>
      <button class="edit-button" data-id="${template.name}">Edit</button>
      <button class="delete-button" data-id="${template.name}">Delete</button>
    `;
    templateList.appendChild(templateItem);
  });

  // Add event listeners to buttons (using event delegation)
  templateList.addEventListener('click', handleButtonClick);
}

async function handleButtonClick(event) {
  const button = event.target;
  const templateName = button.dataset.id;

  if (button.classList.contains('edit-button')) {
    // Handle edit logic (show form, populate with data, etc.)
    console.log("Edit:", templateName);
    // ... (Implementation to be added)
  } else if (button.classList.contains('delete-button')) {
    // Handle delete logic (confirmation, API call, etc.)
      console.log("Delete:", templateName);
      await deleteTemplate(templateName);

  }
}

// Function to delete a template
async function deleteTemplate(templateName) {
  if (!confirm(`Are you sure you want to delete "${templateName}"?`)) {
    return; // Cancel deletion
  }

  try {
    const response = await fetch(`/api/delete-template?name=${encodeURIComponent(templateName)}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log("Template deleted successfully");
      await loadTemplates(); // Reload templates after deletion
    } else {
      console.error("Error deleting template:", response.status);
    }
  } catch (error) {
    console.error("Error deleting template:", error);
  }
}

loadTemplates();