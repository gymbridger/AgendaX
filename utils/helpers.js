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
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return date.toLocaleDateString(undefined, options);
}

module.exports = {
  eventDetails,
  formatEventDate,
  formatDate,
};
