
let loanAmount = 100000;
let annualPercentageRate = 0.05;
let monthlyInterestRate = annualPercentageRate / 12;
let loanDurationInMonths = 60;

console.log(loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths)))));


/*

amortLoanPayment(amount in dollars, APR, loan duration in years)
amortLoanPayment(100000, 5%, 10) // $1060.66
amortLoanPayment(100000, 5%, 5) // $1887.12
amortLoanPayment(100000, 0%, 5) // $1666.67 // 0 is an edge case, 1^x = 1, so you end up with a 0 in denominator.

*/