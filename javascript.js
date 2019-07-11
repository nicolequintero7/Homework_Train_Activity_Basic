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
  //const firstTrain = $("#firstTrain").val().trim();
  const firstTrain= moment($("#firstTrain").val().trim(), "HH:mm:ss").format("HHmm");
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








    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    let tFrequency = 3;

    // Time is 3:30 AM
    let firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    let tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    let tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  

});
