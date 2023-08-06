// put the date fns (or other package stuff here)

// this is moment.js from leftover code of other project. can be deleted once date-fns is working
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};

const { formatDistanceToNow, formatDistance } = require("date-fns");

function eventDetails(event) {
  const startDate = new Date(event.starting_date);
  const endDate = new Date(event.ending_date);
  const timeUntilStart = formatDistanceToNow(startDate);
  const eventLength = formatDistance(startDate, endDate);
  return {
    timeUntilStart,
    eventLength,
  };
}

function formatEventDate(dateString) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

module.exports = {
  eventDetails,
  formatEventDate,
  formatDate,
};
