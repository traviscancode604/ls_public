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

function displayRoundEndStatus(roundNum, userWins, compWins) {
  prompt(`End of round number ${roundNum}.\n`);
  prompt(`Number of USER wins: ${userWins}`);
  prompt(`Number of COMPUTER wins: ${compWins}`);
  prompt(`Number of wins needed to win the game: ${WINS_NEEDED}\n`);
}

function displayEndOfRoundPrompts(userWins, compWins) {
  if (userWins === WINS_NEEDED) {
    prompt(`You have won! You are better than the machine!`);
    prompt(`Type anything to exit.`);
  } else if (compWins === WINS_NEEDED) {
    prompt(`The computer has won. Don't worry, it's just luck!`);
    prompt(`Type anything to exit.`);
  } else {
    prompt(`Type anything to proceed to next round.`);
  }
}

function noGameWinnerYet(userWins, computerWins) {
  return Boolean(userWins < WINS_NEEDED && computerWins < WINS_NEEDED);
}

function invalidAnswer(choice, arrayOfAllowables) {
  return (!arrayOfAllowables.includes(choice));
}

console.clear();
console.log("**********************************************************");
console.log("***  Welcome to Rock, Paper, Scissors, Lizard, Spock!  ***");
console.log("**********************************************************\n");

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

  displayRoundEndStatus(currentRoundNumber, userWinCount, computerWinCount);
  displayEndOfRoundPrompts(userWinCount, computerWinCount);
  readline.question(); // No validation, want to give user a chance to read prompts.
  console.clear();

  currentRoundNumber += 1;

}