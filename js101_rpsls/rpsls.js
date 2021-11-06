const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];
const VALID_GAME_SELECTIONS = ['r', 'p', 's'];

let userInputLetterChoice;
let userChoice;
let computerChoice;
let randomIndexCompChoice;
let playAgainAnswer;

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

function displayWinner(gameOutcome) {
  switch (gameOutcome) {
    case 'user':
      prompt('You win! You are better than the machine.\n');
      break;
    case 'computer':
      prompt('The computer is victorious. You have lost to a machine!\n');
      break;
    case 'tie':
      prompt('it is a tie. You are greater than or equal to the machine.\n');
      break;
  }
}

function invalidAnswer(choice, arrayOfAllowables) {
  return (!arrayOfAllowables.includes(choice));
}

console.clear();
console.log("***********************************************");
console.log("***             Welcome to RPS!             ***");
console.log("***********************************************\n");

while (true) {
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
  displayWinner(playGameRound(userChoice, computerChoice));

  prompt('Do you want to play again (y/n)?');
  playAgainAnswer = readline.question().toLowerCase();

  while (invalidAnswer(playAgainAnswer,['y', 'n'])) {
    prompt('Please enter "y" or "n".');
    playAgainAnswer = readline.question().toLowerCase();
  }

  if (playAgainAnswer[0] !== 'y') break;
}