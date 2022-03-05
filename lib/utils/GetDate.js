// ./lib/utils/GetDate.js

// Note: CST means 'Central Standard Time' for USA
function obtainDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  // Outputs current date in mm/dd/yyyy format
  today = mm + '/' + dd + '/' + yyyy;

  let time = new Date();
  let hh = time.getHours();
  let min = time.getMinutes();
  let ss = time.getSeconds();

  // Outputs the current time in hh:mm:ss format
  time = hh + ':' + min + ':' + ss + ' CST';

  return [today, time];
};

module.exports.obtainDate = obtainDate; 
