// put the date fns (or other package stuff here)

// module.exports = {
//   format_date: (date) => {
//     // Format date as MM/DD/YYYY
//     return date.toLocaleDateString();
//   },
// };

var formatDistanceToNow = require("date-fns/formatDistanceToNow");
const formatDistance = require("date-fns/formatDistance");

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

module.exports = eventDetails;
