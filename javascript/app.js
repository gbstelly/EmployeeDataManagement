

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBr6l9SgkDVKULwg_GaF0d150b-OUbZsFA",
    authDomain: "employee-data-management-b8bd9.firebaseapp.com",
    databaseURL: "https://employee-data-management-b8bd9.firebaseio.com",
    projectId: "employee-data-management-b8bd9",
    storageBucket: "employee-data-management-b8bd9.appspot.com",
    messagingSenderId: "682513024529"
  };
  firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values



    // Button for adding employees
    $("#add-employee-btn").on("click", function(event) {
      event.preventDefault();

      // Grabbed user input
      
      var name    = $("#employee-name-input").val().trim();
      var role    = $("#role-input").val().trim();
      var startDt = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
      var empRate = $("#rate-input").val().trim();
  
      // Creates local "temporary" object for holding employee data
      var newEmp = {
        name: name,
        role: role,
        start: startDt,
        rate: empRate
      };

      // Code for handling the push
      database.ref().push(newEmp);

      // Logs everything to console
      console.log(newEmp.name);
      console.log(newEmp.role);
      console.log(newEmp.start);
      console.log(newEmp.rate);

      alert("Employee successfully added");
      // Clears all of the text-boxes
      $("#employee-name-input").val("");
      $("#role-input").val("");
      $("#start-input").val("");
      $("#rate-input").val("");
    });

    // Firebase watcher .on("child_added"
    //Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

    database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      console.log(childSnapshot.val());

      // Store everything into a variable.
      var empName = childSnapshot.val().name;
      var empRole = childSnapshot.val().role;
      var empStart = childSnapshot.val().start;
      var empRate = childSnapshot.val().rate;
// Employee Info
console.log(empName);
console.log(empRole);
console.log(empStart);
console.log(empRate);

// Prettify the employee start
var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

// Calculate the months worked using hardcore math
// To calculate the months worked
var empMonths = moment().diff(moment(empStart, "X"), "months");
console.log(empMonths);

// Calculate the total billed rate
var empBilled = empMonths * empRate;
console.log(empBilled);

// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(empName),
  $("<td>").text(empRole),
  $("<td>").text(empStartPretty),
  $("<td>").text(empMonths),
  $("<td>").text(empRate),
  $("<td>").text(empBilled)
);

// Append the new row to the table
$("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case


