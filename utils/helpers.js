// put the date fns (or other package stuff here)



// this is moment.js from leftover code of other project. can be deleted once date-fns is working
module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
};
