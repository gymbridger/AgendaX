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
        "You have run out of DELETES for today. Please go the gem store to buy more DELETES!"
      );
    }
  } catch (err) {
    console.log(err);
    alert("An error occurred while deleting the event");
  }
}

// Add event listener to the parent element containing all the delete buttons
const eventsList = document.querySelector(".event-list");
eventsList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest(".delete-button");
  if (deleteButton) {
    event.preventDefault();
    event.stopPropagation(); // Stop event propagation to prevent multiple event triggers

    const eventId = deleteButton.getAttribute("data-id");
    const row = deleteButton.closest(".row");
    const popup = row ? row.querySelector(".popup") : null;
    if (popup) {
      // display popup confirm delete window
      popup.style.display = "flex";
    }

    // confirm
    const confirmButton = popup ? popup.querySelector(".confirm-button") : null;
    if (confirmButton) {
      confirmButton.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event propagation to prevent multiple event triggers

        await confirmDeletion(eventId);
        if (popup) {
          popup.style.display = "none"; // Hide popup after choice
        }
      });
    }

    // Cancel and close popup
    const cancelButton = popup ? popup.querySelector(".cancel-button") : null;
    if (cancelButton) {
      cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event propagation to prevent multiple event triggers

        if (popup) {
          popup.style.display = "none";
        }
      });
    }
  }
});

// Add event listeners to the edit buttons
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Stop event propagation to prevent multiple event triggers

    const eventId = button.getAttribute("data-id");
    document.location.href = `/api/events/${eventId}/edit`;
  });
});

// Get the countdown elements and update the countdown display
const countdownElements = document.querySelectorAll(".countdown");
countdownElements.forEach((countdownElement) => {
  const startDate = new Date(countdownElement.dataset.startDate);
  const intervalId = setInterval(() => {
    const distanceToStart = formatDistanceToNow(startDate, { addSuffix: true });
    countdownElement.textContent = distanceToStart;
  }, 1000);

  countdownElement.dataset.intervalId = intervalId;
});
