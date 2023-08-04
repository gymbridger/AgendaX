document.getElementById('add-event-button').addEventListener('click', async () => {
    try {
      // Collect data for the new event (replace with your own data collection logic)
      const eventData = {
        name: 'New Event',
        description: 'This is a new event.',
        starting_date: '2023-07-30',
        ending_date: '2023-07-31',
      };
  
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        window.location.replace('/profile');
      } else {

        alert('Failed to add event');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the event');
    }
  });
  