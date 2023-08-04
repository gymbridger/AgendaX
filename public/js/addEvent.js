document.querySelector('.new-event-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Collect data for new event
    const name = document.querySelector('#event-name').value.trim();
    const startTime = document.querySelector('#start-time').value.trim();
    const endTime = document.querySelector('#end-time').value.trim();
    const description = document.querySelector('#event-desc').value.trim();

    // Create the eventData object with the user-provided data
    const eventData = {
      name: name,
      starting_date: startTime,
      ending_date: endTime,
      description: description,
    };

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add event');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while adding the event');
  }
});
