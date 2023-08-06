// listen for edit buttons
const editButtons = document.querySelectorAll('.edit-button');

// console log edit button clicks, troubleshooting event errors
editButtons.forEach((editButton) => {
    editButton.addEventListener('click', async () => {
        const eventId = editButton.getAttribute('data-id');
        console.log('Edit button clicked! Event ID:', eventId);

        // modal pop-up styling code
        const modal = document.getElementById('editEventModal');
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');

        try {
            // fetch data, path as 'json' because html is expected with modal, so the json must be fetched inside modal
            const response = await fetch(`/api/events/${eventId}/json`);
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }

            const eventData = await response.json();
            const eventNameInput = document.getElementById('event-name');
            const startTimeInput = document.getElementById('start-time');
            const endTimeInput = document.getElementById('end-time');
            const eventDescInput = document.getElementById('event-desc');

            // show existing event info in modal fields
            eventNameInput.value = eventData.name;
            startTimeInput.value = eventData.start_time;
            endTimeInput.value = eventData.end_time;
            eventDescInput.value = eventData.description;

            // listener for update-button inside modal
            const updateButton = document.querySelector('.update-button');
            updateButton.addEventListener('click', async (event) => {
                event.preventDefault();

                // take any user inputs as changes to event info
                const updatedName = eventNameInput.value;
                const updatedStartTime = startTimeInput.value;
                const updatedEndTime = endTimeInput.value;
                const updatedDescription = eventDescInput.value;

                // make new object with changes
                const updatedEventData = {
                    name: updatedName,
                    start_time: updatedStartTime,
                    end_time: updatedEndTime,
                    description: updatedDescription,
                };

                // PUT request to update event info
                const putResponse = await fetch(`/api/events/${eventId}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedEventData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!putResponse.ok) {
                    throw new Error('Failed to update event');
                }

                // close modal, reload page to avoid bubbling issues
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.location.reload();
            });
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the event details');
        }
    });
});

const cancelButton = document.querySelector('.cancel-button'); // cancel button inside modal
cancelButton.addEventListener('click', () => {
    console.log('Cancel button clicked!');
    const modal = document.getElementById('editEventModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.location.reload(); // reload page to avoid bubbling errors
});