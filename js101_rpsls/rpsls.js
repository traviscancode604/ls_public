const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];
const VALID_GAME_SELECTIONS = ['r', 'p', 's'];
const WINS_NEEDED = 3;

let userInputLetterChoice;
let userChoice;
let computerChoice;
let randomIndexCompChoice;
let currentRoundWinner;
let currentRoundNumber = 1;
let userWinCount = 0;
let computerWinCount = 0;


function prompt(message) {
  console.log(`=> ${message}`);
}

function playGameRound(user, computer) {
  if ((user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')) {
    return 'user';
  } else if ((user === 'rock' && computer === 'paper') ||
             (user === 'paper' && computer === 'scissors') ||
             (user === 'scissors' && computer === 'rock')) {
    return 'computer';
  } else {
    return 'tie';
  }
}

function userChoiceForGame(input) {
  let output;
  switch (input) {
    case 'r':
      output = 'rock';
      break;
    case 'p':
      output = 'paper';
      break;
    case 's':
      output = 'scissors';
      break;
  }
  return output;
}

function displaySelections(user, computer) {
  prompt(`You have selected: ${user}.`);
  prompt(`The computer has selected: ${computer}.\n`);
}

function displayRoundWinner(roundOutcome) {
  switch (roundOutcome) {
    case 'user':
      prompt('You win this round!\n');
      break;
    case 'computer':
      prompt('The computer has won this round.\n');
      break;
    case 'tie':
      prompt('it is a tie!\n');
      break;
  }
}

function noGameWinnerYet(userWins, computerWins) {
  return Boolean(userWins < WINS_NEEDED && computerWins < WINS_NEEDED);
}

function invalidAnswer(choice, arrayOfAllowables) {
  return (!arrayOfAllowables.includes(choice));
}

console.clear();
console.log("***********************************************");
console.log("***             Welcome to RPS!             ***");
console.log("***********************************************\n");

while (noGameWinnerYet(userWinCount, computerWinCount)) {
  prompt(`You can select one of the following: ${VALID_CHOICES.join(', ')}`);
  prompt(`Please type one of the following to chose your fighter: ${VALID_GAME_SELECTIONS.join(', ')}`);
  userInputLetterChoice = readline.question().toLowerCase();

  while (invalidAnswer(userInputLetterChoice, VALID_GAME_SELECTIONS)) {
    prompt(`Please enter one of the following: ${VALID_GAME_SELECTIONS.join(', ')}`);
    userInputLetterChoice = readline.question().toLowerCase();
  }
  // We would like to work with a string for console display purposes.
  userChoice = userChoiceForGame(userInputLetterChoice);

  randomIndexCompChoice = Math.floor(Math.random() * VALID_CHOICES.length);
  computerChoice = VALID_CHOICES[randomIndexCompChoice];

  displaySelections(userChoice, computerChoice);
  currentRoundWinner = playGameRound(userChoice, computerChoice);
  displayRoundWinner(currentRoundWinner);

  switch (currentRoundWinner) {
    case 'user':
      userWinCount += 1;
      break;
    case 'computer':
      computerWinCount += 1;
      break;
    case 'tie':
    default:
      break;
  }

  /*
  displayGameStatus(
    currentRoundNumber,
    userWinCount,
    computerWinCount,
    WINS_NEEDED
  )
  */
  prompt(`End of round number ${currentRoundNumber}.\n`);
  prompt(`Number of USER wins: ${userWinCount}`);
  prompt(`Number of COMPUTER wins: ${computerWinCount}`);
  prompt(`Number of wins needed: ${WINS_NEEDED}\n`);

  // displayEndOfRoundPrompts();
  if (noGameWinnerYet(userWinCount, computerWinCount)) {
    prompt(`Type anything to proceed to next round.`);
  } else if (userWinCount === WINS_NEEDED) {
    prompt(`You have won! You are better than the machine. Type anything to exit.`);
  } else if (computerWinCount === WINS_NEEDED) {
    prompt(`The computer has won. The machine has bested you today. Type anything to exit.`);
  }

  readline.question();
  console.clear();
  currentRoundNumber += 1;

}