// 1. Initialize Firebase
const config = {
    apiKey: "AIzaSyBWpPGQ9Mi1DpBpEFYkgVJaxCu2t491MOE",
    authDomain: "train-project-ad391.firebaseapp.com",
    databaseURL: "https://train-project-ad391.firebaseio.com",
    storageBucket: "train-project-ad391.appspot.com",
};

firebase.initializeApp(config);

const database = firebase.database();



//add new data to the table button
$("#sButton").on("click", function(event) {
    event.preventDefault();

      // Grabs user input
  const trainName = $("#trainName").val().trim();
  const destination = $("#destination").val().trim();
  const firstTrain = $("#firstTrain").val().trim();
  const fMinute = $("#fMinute").val().trim();

    // Creates local "temporary" object for holding employee data
    const firebaseData = {
        one: trainName,
        two: destination,
        three: firstTrain,
        four: fMinute
      };
    
      // Uploads employee data to the database
      database.ref().push(firebaseData);
    
      // Logs everything to console
      console.log(firebaseData.trainName);
      console.log(firebaseData.destination);
      console.log(firebaseData.firstTrain);
      console.log(firebaseData.fMinute);

    

    

    //clears the input boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#fMinute").val("");
});


//create a firebase event
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());   

  // Store everything into a variable.
  const trainName = childSnapshot.val().one;
  const destination = childSnapshot.val().two;
  const firstTrain = childSnapshot.val().three;
  const fMinute = childSnapshot.val().four;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(fMinute);


  // Prettify the employee start
//   let empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
//   let empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

  // Calculate the total billed rate
//   let empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(fMinute),
    
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#newTable > tbody").append(newRow);
});
