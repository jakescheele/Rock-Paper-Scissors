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

// array of objects of games
let openGamesArray = [];
// push open games from firebase to openGames
database.ref().on("child_added", function(snapshot) {
  openGamesArray.push(snapshot.val());
})
console.log('open games array: ',openGamesArray)


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
console.log('ref',database.ref())


// FIND MATCH FN
let findMatch = function () {
  // show 'searching for game' beneath start game
  console.log('BROKEN openGames from fb', openGamesArray)
  // loop through opengames in firebase
  for (i in openGamesArray) {
    // find game with empty player2
    if (openGamesArray[i].player2 === '') {
      // set player2 to current players ID
      openGamesArray[i].player2 = playerID;
      // pull game ID of found game
      openGamesArray[i].gameID = gameID;
      // stop loop from continuing after game is found
      break;
    }
    // push openGames to firebase
    // database.ref().set({
    //   openGames: openGamesArray
    // });
  }

  // if can't find game or no games exist, generate new gameID
  if (gameID === '') {
    console.log('creating new game...')
    // generate new gameID
    gameID = ID();
    // append to opengames
    database.ref().push({
      'gameID': gameID,
      'player1': playerID
    })
    // display "Searching for player..." pause .5 sec
    $('#gameMessage').html('Looking for player...')
  }

  // be looking for changes to this game object to know when player2 field is populated
  // FIX THIS
  database.ref().on('value', function (snapshot) {
    // refresh openGames to current firebase version
    // loop through openGames to find matching gameID, 
    for (i in openGamesArray) {
      if (openGamesArray[i].gameID === gameID) {
        console.log('line 93', openGamesArray[0])
        if (this.player2 !== null && this.gameID === gameID){
        console.log("Player found: ", snapshot.val());
        // snapshot.val().openGames[i].player2)
        setTimeout(function(){$('#gameMessage').html('Player found!')}, 1000);
        setTimeout(function(){startGame()}, 2000);
        }
      }
    }
    // stop on value fn from continuing
  })

}


// START GAME FN
let startGame = function () {
  // go to game page
  // window.location = 'game.html'
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
  // make self appear active in html (blue border)
  // let option = this.val()
  // push option to currentGame object in firebase using currentGameIndex (if playerID = currentGame.player1 then .push('option1', option))

  // on(value) to check to see if both answers are filled out
  // display "Waiting for other player..."
  compareAnswers()
};

// COMPARE ANSWERS FN
let compareAnswers = function () {
  // if tie
  if (p1choice === p2choice) {
  }

  if (p1choice === rock) {
    if (p2choice === scissors) player1wins()
    else player2wins()
  }
  if (p1choice === paper) {
    if (p2choice === rock) player1wins()
    else player2wins()
  }
  if (p1choice === scissors) {
    if (p2choice === paper) player1wins()
    else player2wins()
  }
}

// PLAYER 1 WINS FN
let player1wins = function () {
  if (playerID === player1) {
    // myWins++
    $('#modal').modal('show')
  }
  else {
    // myLosses++
    $('#modal').modal('show')
  };
  nextRound();
}

// PLAYER 2 WINS FN
let player2wins = function () {
  if (playerID === player2) {
    // myWins++
    $('#modal').modal('show')
  }
  else {
    // myLosses++
    $('#modal').modal('show')
  };
  nextRound();
}

// GAME OVER FN
let gameOver = function () {
// move from openGames in firebase to finishedGames
}

// On session exit / window close, either add ability to rejoin game or remove game from firebase and alert other user


// CLICK HANDLERS

$('#startGame').on('click', findMatch);



