// ./lib/utils/GetDate.js

// Determines and returns current date (mm/dd/yyyy)
function obtainDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

  return today;
};

module.exports.obtainDate = obtainDate; 
