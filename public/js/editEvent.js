// listen for edit buttons
const editButtons = document.querySelectorAll('.edit-button');

// formatting function to handle displaying dates so a human can read it
function formatDateToMMDDYYYY(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

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
            const startDateInput = document.getElementById('new-start-date'); // new date from datepicker
            const endDateInput = document.getElementById('new-end-date'); // new date from datepicker
            const existingStartDate = document.getElementById('existing-start-date'); // existing date to display
            const existingEndDate = document.getElementById('existing-end-date'); // existing date to display
            const eventDescInput = document.getElementById('event-desc');

            // checking the event data for debugging
            console.log(eventData);

            // show existing event info in modal fields
            eventNameInput.value = eventData.name;
            // format existing start and end dates to display them
            existingStartDate.textContent = formatDateToMMDDYYYY(eventData.starting_date);
            existingEndDate.textContent = formatDateToMMDDYYYY(eventData.ending_date);
            eventDescInput.value = eventData.description;

            // listener for update-button inside modal
            const updateButton = document.querySelector('.update-button');
            updateButton.addEventListener('click', async (event) => {
                event.preventDefault();
                // get edited event info as new values
                const updatedName = eventNameInput.value.trim();
                const updatedStartDate = startDateInput.value.trim();
                const updatedEndDate = endDateInput.value.trim();

                if (!updatedName || !updatedStartDate || !updatedEndDate) {
                    alert('One or more required fields is empty');
                    return; // validate inputs not null
                }

                const updatedDescription = eventDescInput.value;

                // make new object with changes
                const updatedEventData = {
                    name: updatedName,
                    starting_date: updatedStartDate,
                    ending_date: updatedEndDate,
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
