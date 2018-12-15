// Initialize FireBase
var config = {
    apiKey: "AIzaSyCNz2TiZxeXA-3o8I3yXazjsHUXL7jKs08",
    authDomain: "trainwreck-25e4e.firebaseapp.com",
    databaseURL: "https://trainwreck-25e4e.firebaseio.com",
    projectId: "trainwreck-25e4e",
    storageBucket: "trainwreck-25e4e.appspot.com",
    messagingSenderId: "996342540198"
  };
  firebase.initializeApp(config);

//   Create variable to hold database
    var database = firebase.database();

    // Variable to hold the moment function ----NEEDS WORK!!!!----  
  var trainTimeMoment = moment().format('h:mm a');
  console.log(trainTimeMoment);
  var frequencyTime =  $("#frequency-input").val().trim();
  console.log(frequencyTime);

    var minutesAway = trainTimeMoment + frequencyTime;
    console.log(minutesAway);

// Button to add trains
    $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// Grab user input
var trainName = $("#train-name-input").val().trim();
var cityName = $("#destination-input").val().trim();
var trainTime = moment($("#time-input").val().trim(), "hh:mm a").format("H");
var frequencyTime = $("#frequency-input").val().trim();


// Creates local "temporary" object for holding employee data.
var newTrain = {
    train: trainName,
    destination: cityName,
    time: trainTime,
    frequency: frequencyTime,
    // remaining: remainingTime
};

// Uploads the data to the Firebase database
database.ref().push(newTrain);

// Logs the info
console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");


});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var cityName = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequencyTime = childSnapshot.val().frequency;
    // var remainingTime = childSnapshot.val().remaining;
    // Train Info
  console.log(trainName);
  console.log(cityName);
  console.log(trainTime);
  console.log(frequencyTime);




// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(cityName),
    $("<td>").text(frequencyTime),
    $("<td>").text(trainTime),
    $("<td>").text(minutesAway),

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);



});
