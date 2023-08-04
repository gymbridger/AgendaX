async function confirmDeletion(eventId) {
  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`${eventId} was deleted`);
      document.location.reload();
    } else {
      alert('You have run out of DELETES for today. Please go the gem store to buy more DELETES!');
    }
  } catch (err) {
    console.log(err);
    alert('ERROR! ERROR!');
  }
};

// event listeners for each button in the popup
const eventListContainer = document.querySelector('.event-items');
if (eventListContainer) { // check if container exists because event listeners throw console error if user has no buttons to listen for
  eventListContainer.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.classList.contains('delete-button')) {
      const eventId = target.getAttribute('data-id');
      const popup = document.querySelector('.popup');

      // display popup confirm delete window
      popup.style.display = 'flex';

      // confirm
      const confirmButton = document.querySelector('.confirm-button');
      confirmButton.addEventListener('click', async (event) => {
        event.stopImmediatePropagation();
        await confirmDeletion(eventId);
        popup.style.display = 'none'; // Hide popup after choice
      });

      // cancel and reload page
      const cancelButton = document.querySelector('.cancel-button');
      cancelButton.addEventListener('click', () => {
        popup.style.display = 'none';
        document.location.reload(); // Reload the page to reset the popup so the delete bug does not propagate 
      });
    }
  });
}

// Add event listener for the "Add Event" button separately
const addEventButton = document.getElementById('add-event-button');
addEventButton.addEventListener('click', () => {
  // Code for handling the Add Event button click goes here
});
