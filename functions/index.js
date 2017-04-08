var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })


/*exports.push = functions.database.ref('/events').onWrite(event => {
    var eventSnapshot = event.data;

	console.log("created event: " + eventSnapshot);

	 var payload = {
  data: {
    title: "NEUE DEMO",
    body: "lalalalal"
  }
};

// This registration token comes from the client FCM SDKs.
var registrationToken = "fZVI0mYKCyg:APA91bFu_RehwbNhROSitNMyKASPbJ_UsHmLCGSwmGa-_LM7Bre6qvl7E4iz_tx9VthPLhUmSUcpCsuKyCPERKnmaiPbsmkv3mi5KT7ImX-CsQsf2GFp3F9IsX49UcekK4l5pmE9U2pG";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  data: {
    score: "850",
    time: "2:45"
  }
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().sendToDevice(registrationToken, payload)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });



	return true;
  });
*/
