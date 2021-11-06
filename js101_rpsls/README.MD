# JS101 Assignment: Rock, Paper, Scissors, Lizard, Spock


## Problem
Add bonus features to the existing rock paper scissors program.

1. Add Lizard and Spock functionality to the traditional rock paper scissors game.
2. Add shortened inputs (r for rock, p for paper, etc. How will you deal with 2 words using s?)
3. Best of 5. Keep track of the score. First to 3 wins.

## Examples
Rock beats lizard and scissors
Paper beats rock and Spock
Scissors beats paper and lizard
Spock beats rock and scissors
Lizard beats Spock and paper 

## Data
Input: String inputs from the user in the console for 1 of 5 options.

Output: is a console log of the results.

## Algorithm
Will need a few helper functions to improve abstraction / readability of the code.

SET userNumberOfWins = 0;
SET compNumberOfWins = 0;
SET NUMBER_OF_WINS_REQUIRED = 3; // best of 5

playGameRound(playerChoice, CompChoice):
Pass the two choices, evaluate. Return the player who won this round.

If player wins, increment userNumberOfWins.
If comp wins, increment compNumberOfWins.

hasPlayerWonYet(userNumberOfWins):
Pass the variable tracking number of wins, if it is greater than the win condition, return true. otherwise return false.
Do this for both players. If neither player has won yet, keep playing, otherwise declare a winner.

-input string validator (so you can't type sprinkler instead of just s)

## Code
See rpsls.js