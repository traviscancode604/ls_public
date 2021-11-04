const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
let inputLoanAmount;
let inputAnnualPercentageRate;
let inputLoanDurationInYears;

function amortLoanPayment(
  loanAmount, annualPercentageRate, loanDurationInYears
) {
  let monthlyInterestRate = Number(annualPercentageRate) / 12;
  let loanDurationInMonths = Number(loanDurationInYears) * 12;
  let monthlyPayment;

  if (Number(annualPercentageRate)) {
    monthlyPayment = (
      Number(loanAmount)
      * (monthlyInterestRate
      / (1 - Math.pow((1 + monthlyInterestRate),
        (-loanDurationInMonths))))
    ).toFixed(2);
  } else {
    monthlyPayment = (Number(loanAmount) / loanDurationInMonths).toFixed(2);
  }
  return monthlyPayment;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

console.log("***********************************************");
console.log("*** Welcome to the Loan Calculator Program! ***");
console.log("***********************************************\n");

while (true) {
  prompt(MESSAGES.principalPrompt);
  inputLoanAmount = readline.question();

  while (inputLoanAmount === '0' || invalidNumber(inputLoanAmount)) {
    prompt(MESSAGES.inputErrorMsg);
    inputLoanAmount = readline.question();
  }

  prompt(MESSAGES.annualInterestPrompt);
  inputAnnualPercentageRate = readline.question();

  while (invalidNumber(inputAnnualPercentageRate)) {
    prompt(MESSAGES.inputErrorMsg);
    inputAnnualPercentageRate = readline.question();
  }

  prompt(MESSAGES.loanDurationPrompt);
  inputLoanDurationInYears = readline.question();

  while (
    inputLoanDurationInYears < 0.5 || invalidNumber(inputLoanDurationInYears)
  ) {
    // Need 7 sig-figs to properly calculate months.
    // So we'll use a reasonable loan periods (ie: half a year or more).
    prompt(MESSAGES.inputErrorMsg);
    inputLoanDurationInYears = readline.question();
  }

  prompt(
    MESSAGES.outputMsg
    + amortLoanPayment(
      inputLoanAmount,
      inputAnnualPercentageRate,
      inputLoanDurationInYears
    )
  );

  prompt(MESSAGES.retryMsg);
  let answer = readline.question();
  if (answer[0].toLowerCase() !== 'y') break;
}
prompt(MESSAGES.exitMsg);
/*
console.log(amortLoanPayment(10000, 0.05, 0.5)); // $1,691.06
console.log(amortLoanPayment(100000, 0.05, 10)); // $1060.66
console.log(amortLoanPayment(100000, 0.05, 5)); // $1887.12
console.log(amortLoanPayment(100000, 0.0, 5)); // $1666.67

0% interest is an edge case (you end up with a 0 in denominator)

*/
