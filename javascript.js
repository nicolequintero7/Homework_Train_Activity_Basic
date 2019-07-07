// 1. Initialize Firebase
const config = {
    apiKey: "AIzaSyBWpPGQ9Mi1DpBpEFYkgVJaxCu2t491MOE",
    authDomain: "train-project-ad391.firebaseapp.com",
    databaseURL: "https://train-project-ad391.firebaseio.com",
    storageBucket: "",
};

firebase.initializeApp(config);

const database = firebase.database();

console.log("Page Loaded");

//add new data to the table button
$("#btn btn-primary").on("click", function(event) {
    event.preventDefault();

      // Grabs user input
  const trainName = $("#trainName").val().trim();
  const destination = $("#destination").val().trim();
  const firstTrain = moment($("#firstTrain").val().trim(), "MM/DD/YYYY").format("X");
  const fMinute = $("#fMinute").val().trim();

    // Creates local "temporary" object for holding employee data
    const firebaseData = {
        Trainname: trainName,
        TrainDestination: destination,
        FirstTrain: firstTrain,
        FrequencyMinute: fMinute
      };
    
      // Uploads employee data to the database
      database.ref().push(firebaseData);
    
      // Logs everything to console
      console.log(firebaseData.trainName);
      console.log(firebaseData.destination);
      console.log(firebaseData.firstTrain);
      console.log(firebaseData.fMinute);

    });
