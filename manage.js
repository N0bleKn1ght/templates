const templateList = document.getElementById('template-list');

// Fetch and display templates
async function loadTemplates() {
  try {
    const response = await fetch('/templates.json'); // Fetch from the root of your deployment
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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
  } catch (error) {
    console.error('Error fetching or parsing templates:', error);
    templateList.innerHTML = '<p>Error loading templates.</p>';
  }
}

async function handleButtonClick(event) {
  const button = event.target;
  const templateName = button.dataset.id;

  if (button.classList.contains('edit-button')) {
    // Handle edit logic 
    console.log("Edit:", templateName);
    handleEditClick(templateName);
  } else if (button.classList.contains('delete-button')) {
    // Handle delete logic 
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

// Function to handle the edit button click
function handleEditClick(templateName) {
  const templateItem = event.target.closest('.template-item');
  const templateContent = templateItem.querySelector('p').textContent;

  // Replace the template content with a form for editing
  templateItem.innerHTML = `
    <h3>${templateName}</h3>
    <textarea>${templateContent}</textarea>
    <button class="save-button" data-id="${templateName}">Save</button>
    <button class="cancel-button">Cancel</button>
  `;

  // Add event listeners for save and cancel buttons
  templateItem.querySelector('.save-button').addEventListener('click', handleSaveClick);
  templateItem.querySelector('.cancel-button').addEventListener('click', handleCancelClick);
}

// Function to handle the save button click
async function handleSaveClick(event) {
    const templateItem = event.target.closest('.template-item');
    const templateName = event.target.dataset.id;
    const updatedContent = templateItem.querySelector('textarea').value;
  
    try {
      const response = await fetch('/api/update-template', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: templateName, content: updatedContent })
      });
  
      if (response.ok) {
        console.log("Template updated successfully");
        await loadTemplates(); // Reload templates after update
      } else {
        console.error("Error updating template:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error updating template:", error);
    }
  }
  

// Function to handle the cancel button click
function handleCancelClick(event) {
  loadTemplates(); // Reload templates to revert to original display
}

loadTemplates();