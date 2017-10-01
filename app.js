// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRKPHrbCkuygCsomADsV2CA74aYv0B6Js",
    authDomain: "multiplayer-rps-fb3f9.firebaseapp.com",
    databaseURL: "https://multiplayer-rps-fb3f9.firebaseio.com",
    projectId: "multiplayer-rps-fb3f9",
    storageBucket: "",
    messagingSenderId: "835602999540"
};
firebase.initializeApp(config);
var database = firebase.database();



// rock paper scissors game

// declare win and loss counters for player 1 and player 2

var pOneWinCounter = 0;
var pOneLossCounter = 0;
var pTwoWinCounter = 0;
var pTwoLossCounter = 0;
// The maximum number of players.  If there are already 
// numPlayers assigned, users won't be able to join the game.
var numPlayers = 2;
var userID = "";
var playerNum;
var userRemoved;
var users = [];
var con, ids;
var me;





var usersRef = database.ref("/player_data");
var playerList = database.ref("/player_list");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

function emptyPlayerList() {
  me.remove();
}

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {



        // Add user to the connections list.
        var connected = {
            userdata: true
        }
        con = usersRef.push(connected);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
        // set outside function to empty player list and call it on disconnect
 
    }
});


usersRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    playerNum = snap.numChildren();
    // prompt user for username
    if (playerNum <= 2 && userID === "") {
        // userID = prompt('username?');
        $("#login").show();
        $("#add-user").on("click", function() {
            event.preventDefault();
            userID = $("#username").val().trim();
            var user = {
                username: userID
            };
            var userData = con.key;

            var getID = usersRef.child(userData).push(user);
            getID.on("value", function (snap) {
              
              snap.forEach(function (childSnap) {
              
              me = childSnap.val();
              users.push(me);
              console.log(me);
 });

             });   
            var temp = playerList.push(users);
              var players = temp.key;
              playerList.on("value", function (snap) {
                childNum = snap.numChildren();
           snap.forEach(function (childSnap) {
            var playing = childSnap.child(0).val();
            if (childNum <= 2 && $("#users p").hasClass(playing) === false) {
              var addUser = $("<p>", {"class" : playing});
              addUser.text(playing);
              $('#users').append(addUser);
             
            }
            
             else
            {
          console.log("game full");
        };
       
 }); 
    }); 

        });

    } else if (playerNum > 2) {
        $('#game-info').prepend("<h2>game full</h2>");
    }


});

//$('#users').append('<p>' + childSnap.val() + '</p>');

// player one picks rock paper or scissors

// player two picks rock paper or scissors

// calculate who wins

// update win and loss counters for appropriate players