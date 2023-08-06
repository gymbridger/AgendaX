document.getElementById('add-event-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // make a FormData object to extract only the data values and no added html which causes POST to fail
    const formData = new FormData(document.getElementById('add-event-form'));
    const name = formData.get('event-name').trim();
    const startTime = formData.get('start-time').trim();
    const endTime = formData.get('end-time').trim();
    const description = formData.get('event-desc').trim();

    if (!name || !startTime || !endTime) {
      alert('One or more required fields is empty');
      return; // validate inputs not null
    }

    // create event data object with event values
    const eventData = {
      name: name,
      starting_date: startTime,
      ending_date: endTime,
      description: description,
    };

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // set the content type to JSON
      },
      body: JSON.stringify(eventData), // convert the data to a JSON string
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
