document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[data-event-id]");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const eventId = form.getAttribute("data-event-id");
      const formData = new FormData(form);

      try {
        const response = await fetch(`/api/events/${eventId}/edit`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Event updated successfully!");
          // Redirect to the profile page after a successful update
          window.location.replace("/profile");
        } else {
          console.error("Error updating event");
        }
      } catch (err) {
        console.error("Error updating event", err);
      }
    });
  }
});
