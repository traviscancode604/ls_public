# JS101 Assignment: Mortgage / Car Loan Calculator 

## Problem
Take everything that you've learned so far and build a mortgage calculator (or car payment calculator -- it's the same thing).

You'll need three pieces of information:

1. the loan amount
2. the Annual Percentage Rate (APR)
3. the loan duration

From the above, you'll need to calculate the following two things:

1. monthly interest rate
2. loan duration in months


## Examples

    amortLoanPayment(amount in dollars, APR, loan duration in years)
    amortLoanPayment(100000, 5%, 10) // $1060.66
    amortLoanPayment(100000, 5%, 5) // $1887.12
    amortLoanPayment(100000, 0%, 5) // $1666.67


## Data
Assumptions for inputs to determine edge case boundaries:

1. Assuming the loan is an amortized loan at a fixed interest rate (no variable interest rates).
2. Interest rate is a number between 0-100% (interest free loans are allowed).
3. Assuming no lump sum or accelerated payments in the amortization schedule.
4. Loan ammount is at least $1.00.
5. Loan duration must be at least 0.5 years. 0.0833333 is needed to properly do months.
6. Interest is compounded once a month at the end of the month.

Inputs will be 3 seperate numbers.
Output will be a single number with 2 decimal places.


## Algorithm
Ask the user if they are calculating a mortgage payment or a car loan payment.
- load the appropriate prompt messages from the .json file.

Ask the user for the 3 inputs (loan amount, APR interest rate, and duration in years).
- Ask for each input separately.
- Validate each input before moving to the next. 
- Contest the user to re-enter the input amount if the input has failed validation.

Convert the inputs to the appropriate units for the monthly payment calculator. 
- the interest rate `j` in the equation needs to be expressed as a decimal value. 5% = 0.05 
- The length of the loan `N` needs to be expressed in months.

Return the monthly payment amount.

Ask the user if they would like to try a new calculation, or exit the program.


## Code
See loan_calc.js