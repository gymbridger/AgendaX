const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

// Add an event listener to the delete button
document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const eventId = event.target.getAttribute('data-id');
    const popup = document.querySelector('.popup');
    const confirmButton = document.querySelector('.confirm-button');
    const cancelButton = document.querySelector('.cancel-button');

    popup.style.display = 'flex';


    confirmButton.addEventListener('click', async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {

          document.location.reload();
        } else {
          alert('Failed to delete event');
        }
      } catch (err) {
        console.log(err);
        alert('An error occurred while deleting the event');
      } finally {
        popup.style.display = 'none';
      }
    });

    // Add event listener to the cancel button
    cancelButton.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  });
});
