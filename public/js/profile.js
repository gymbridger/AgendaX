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
const eventListContainer = document.querySelector('.event-list');
if (eventListContainer) {
  eventListContainer.addEventListener('click', async (event) => {
    const target = event.target;

    // Find the parent event item element containing the delete button
    const eventItem = target.closest('.event-item');

    if (target.classList.contains('delete-button')) {
      const eventId = target.getAttribute('data-id');
      const popup = eventItem.querySelector('.popup'); // Select the popup within the event item

      // display popup confirm delete window
      popup.style.display = 'flex';

      // confirm
      const confirmButton = popup.querySelector('.confirm-button'); // Select the confirm button within the popup
      confirmButton.addEventListener('click', async (event) => {
        event.stopImmediatePropagation();
        await confirmDeletion(eventId);
        popup.style.display = 'none'; // Hide popup after choice
      });

      // cancel and reload page
      const cancelButton = popup.querySelector('.cancel-button'); // Select the cancel button within the popup
      cancelButton.addEventListener('click', () => {
        popup.style.display = 'none';
        document.location.reload(); // Reload the page to reset the popup
      });
    }
  });
}


// listener for the "Add Event" button
const addEventButton = document.getElementById('add-event-button');
addEventButton.addEventListener('click', () => {
  console.log("Adding event...")
});
