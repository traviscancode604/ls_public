const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
let inputCalcType;
let calcType;
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

prompt('What type of loan would you like to calculate today?\nPlease type: \n1 for a car loan.\n2 for a mortgage.');
inputCalcType = readline.question();

while (!['1', '2'].includes(inputCalcType)) {
  prompt(messages('inputErrorMsg'));
  inputCalcType = readline.question();
}

switch (inputCalcType) {
  case '1':
    calcType = 'car';
    break;
  case '2':
    calcType = 'mortgage';
}

while (true) {
  prompt(messages('principalPrompt', calcType));
  inputLoanAmount = readline.question();

  while (
    Number(inputLoanAmount) <= 0
    || invalidNumber(inputLoanAmount)
  ) {
    // Need a greater than zero loan amount that is also a valid number.
    prompt(messages('inputErrorMsg', calcType));
    inputLoanAmount = readline.question();
  }

  prompt(messages('annualInterestPrompt', calcType));
  // Will technically work with more than 100%, but isn't program breaking.
  inputAnnualPercentageRate = readline.question();

  while (
    Number(inputAnnualPercentageRate) < 0
    || invalidNumber(inputAnnualPercentageRate)
  ) {
    prompt(messages('inputErrorMsg', calcType));
    inputAnnualPercentageRate = readline.question();
  }

  prompt(messages('loanDurationPrompt', calcType));
  inputLoanDurationInYears = readline.question();

  while (
    Number(inputLoanDurationInYears) < 0.5
    || invalidNumber(inputLoanDurationInYears)
  ) {
    // Need 7 sig-figs to properly calculate months.
    // So we'll use a reasonable loan periods (ie: half a year or more).
    prompt(messages('inputErrorMsg', calcType));
    inputLoanDurationInYears = readline.question();
  }

  prompt(
    messages('outputMsg', calcType)
    + amortLoanPayment(
      inputLoanAmount,
      inputAnnualPercentageRate,
      inputLoanDurationInYears
    )
  );

  prompt(messages('retryMsg', calcType));
  let answer = readline.question();
  if (answer[0].toLowerCase() !== 'y') {
    break;
  } else {
    console.clear();
  }

}
prompt(messages('exitMsg', calcType));
/*
console.log(amortLoanPayment(10000, 0.05, 0.5)); // $1,691.06
console.log(amortLoanPayment(100000, 0.05, 10)); // $1060.66
console.log(amortLoanPayment(100000, 0.05, 5)); // $1887.12
console.log(amortLoanPayment(100000, 0.0, 5)); // $1666.67

0% interest is an edge case (you end up with a 0 in denominator)

*/
