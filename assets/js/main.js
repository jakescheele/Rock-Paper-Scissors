// Initialize Firebase
var config = {
  apiKey: "AIzaSyAwsPP7JWUJDN7LnUeP1qUUIESbkuKyk2w",
  authDomain: "rock-paper-scissors-8b263.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-8b263.firebaseio.com",
  projectId: "rock-paper-scissors-8b263",
  storageBucket: "",
  messagingSenderId: "322355667082"
};
firebase.initializeApp(config);

let database = firebase.database();

let gameID = '';

let currentGameIndex = '';

let roundNumber = 0;

// function that generates random ID
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

let playerID = localStorage.getItem('playerID')

// Check if playerID in localstorage exists, if not create one
if (playerID === null || playerID === undefined || playerID.length === 0) {
  localStorage.setItem('playerID', ID())
  console.log('New Player ID: ', playerID)
}
// else grab existing playerID (can be removed)
else {
  console.log('Player ID: ', playerID)
}


// FIND MATCH FN
let findMatch = function () {
  // show 'searching for game' beneath start game
  // THIS LINE IS BROKEN 
  let openGames = database.ref('openGames')
  console.log('BROKEN openGames from fb', openGames)
  // loop through opengames in firebase
  for (i in openGames) {
    // find game with empty player2
    if (openGames[i].player2 === '') {
      // set player2 to current players ID
      openGames[i].player2 = playerID;
      // pull game ID of found game
      openGames[i].gameID = gameID;
      // send to currentGame variable
      i = currentGameIndex
      // stop loop from continuing after game is found
      break;
    }
    // push openGames to firebase
    database.ref().set('openGames', openGames);
  }

  // if can't find game or no games exist, generate new gameID
  if (openGames === null || localStorage.getItem('gameID') === null) {
    // generate new gameID
    gameID = ID();
    // append to opengames
    openGames.push({
      'gameID': gameID,
      'player1': playerID,
      'player2': ''
    })
    // display "Searching for player..." pause .5 sec
    // push openGames array to firebase
    database.ref().set('openGames', openGames)
  }

  // be looking for changes to this game object to know when player2 field is populated
  // FIX THIS
  database.ref(player2).on('value', function (snapshot) {
   
    // refresh openGames to current firebase version
    // loop through openGames to find matching gameID,  
    for (i in openGames) {
      if (openGames[i].gameID === gameID) {
        console.log("Player found: ", snapshot.val());
        // snapshot.val().openGames[i].player2)
        startGame();
      }
    }
    // display "Player found!" pause .5 sec
    // stop on value fn from continuing
    break;
  })

}


// START GAME FN
let startGame = function () {
  // go to game page
  window.location.pathname = 'game.html'
  // use gameID to find players in game, display player name that isn't you in opponent div
  beginRound()
}

// BEGIN ROUND FN
let beginRound = function () {
  // grab myWins and myLosses from localstorage, display on header
  // database.ref(roundNumber)++
  roundNumber++;
  // push 'round'+roundNumber object into firebase game ojbect
  
}

// OPTION CLICKED FN
let optionClicked = function () {
// make self appear active in html
// let option = this.val()
// push option to currentGame object in firebase using currentGameIndex (if playerID = currentGame.player1 then .push('option1', option))
// sync currentGame to openGames
// sync openGames with firebase
// on(value) to check to see if both answers are filled out
// compareAnswers()
}

// COMPARE ANSWERS FN
let compareAnswers = function () {
// if tie

// if player1 choose rock

  // if player2 choose scissors
    // player1 wins
  // else player 2 wins

// if player1 choose paper

  // if player2 choose rock
    // player1 wins
  // else player 2 wins

// if player1 choose scissors

  // if player2 choose paper
    // player1 wins
  // else player 2 wins
}



// CLICK HANDLERS

$('#startGame').on('click', findMatch);

