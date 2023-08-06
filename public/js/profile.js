document.addEventListener("DOMContentLoaded", () => {
  // Function to handle event deletion
  async function confirmDeletion(eventId) {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`${eventId} was deleted`);
        document.location.reload();
      } else {
        alert(
          "You have run out of DELETES for today. Please go to the gem store to buy more DELETES!"
        );
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while deleting the event");
    }
  }

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

        // confirm
        const confirmButton = popup
          ? popup.querySelector(".confirm-button")
          : null;
        if (confirmButton) {
          confirmButton.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation(); // Stop event propagation to prevent multiple event triggers

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
  })
}
})