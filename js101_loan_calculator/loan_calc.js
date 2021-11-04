const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
let inputLoanAmount;
let inputAnnualPercentageRate;
let inputLoanDurationInYears;
// got to here, need to add the 'languages' functionality...

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

function messages(message, loan = 'mortgage') {
  return MESSAGES[loan][message];
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}
console.clear();
console.log("***********************************************");
console.log("*** Welcome to the Loan Calculator Program! ***");
console.log("***********************************************\n");

while (true) {
  prompt(messages('principalPrompt'));
  inputLoanAmount = readline.question();

  while (inputLoanAmount === '0' || invalidNumber(inputLoanAmount)) {
    // Need a non-zero loan amount that is also a valid number.
    prompt(messages('inputErrorMsg'));
    inputLoanAmount = readline.question();
  }

  prompt(messages('annualInterestPrompt'));
  // Will technically work with more than 100%, but isn't program breaking.
  inputAnnualPercentageRate = readline.question();

  while (invalidNumber(inputAnnualPercentageRate)) {
    prompt(messages('inputErrorMsg'));
    inputAnnualPercentageRate = readline.question();
  }

  prompt(messages('loanDurationPrompt'));
  inputLoanDurationInYears = readline.question();

  while (
    inputLoanDurationInYears < 0.5 || invalidNumber(inputLoanDurationInYears)
  ) {
    // Need 7 sig-figs to properly calculate months.
    // So we'll use a reasonable loan periods (ie: half a year or more).
    prompt(messages('inputErrorMsg'));
    inputLoanDurationInYears = readline.question();
  }

  prompt(
    messages('outputMsg')
    + amortLoanPayment(
      inputLoanAmount,
      inputAnnualPercentageRate,
      inputLoanDurationInYears
    )
  );

  prompt(messages('retryMsg'));
  let answer = readline.question();
  if (answer[0].toLowerCase() !== 'y') {
    break;
  } else {
    console.clear();
  }

}
prompt(messages('exitMsg'));
/*
console.log(amortLoanPayment(10000, 0.05, 0.5)); // $1,691.06
console.log(amortLoanPayment(100000, 0.05, 10)); // $1060.66
console.log(amortLoanPayment(100000, 0.05, 5)); // $1887.12
console.log(amortLoanPayment(100000, 0.0, 5)); // $1666.67

0% interest is an edge case (you end up with a 0 in denominator)

*/
