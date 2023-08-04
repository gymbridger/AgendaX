document.addEventListener('click', async (event) => {
    if (event.target && event.target.matches('#delete-button')) {
        console.log('Show event Click')
        try {
            const confirmed = window.confirm('Are you sure you want to delete this event?');

            if (confirmed) {

                const eventId = window.location.pathname.split('/').pop();

                // Make a DELETE request to delete the event
                const response = await fetch(`/api/events/${eventId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {

                    document.location.replace('/profile');
                } else {

                    alert('Failed to delete event');
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the event');
        }
    }
});

  
  
  
  
  
  