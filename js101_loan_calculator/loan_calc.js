const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
let inputLoanAmount;
let inputAnnualPercentageRate;
let inputLoanDurationInYears;

function amortLoanPayment(loanAmount, annualPercentageRate, loanDurationInYears) {
  let monthlyInterestRate = annualPercentageRate / 12;
  let loanDurationInMonths = loanDurationInYears * 12;
  let monthlyPayment;

  if (annualPercentageRate) {
    monthlyPayment = (loanAmount * (monthlyInterestRate / 
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths))))).toFixed(2);
  } else {
    monthlyPayment = (loanAmount / loanDurationInMonths).toFixed(2);
  }
return monthlyPayment;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt("Welcome to the Loan Calculator Program!");

prompt(MESSAGES.principalPrompt);
inputLoanAmount = readline.question();


prompt(MESSAGES.testMsg);
console.log(inputLoanAmount);
console.log(amortLoanPayment(100000, 0.05, 10)); // $1060.66
console.log(amortLoanPayment(100000, 0.05, 5)); // $1887.12
console.log(amortLoanPayment(100000, 0.0, 5)); // $1666.67. 0 is an edge case (you end up with a 0 in denominator)
