#! /usr/bin/env node
import inquirer from "inquirer";

let mypin: number = 9491;
let balance: number = 100000; // dollars

try {
  let myatm = await inquirer.prompt([
    {
      name: 'pin',
      type: 'number',
      message: 'Enter your pin'
    }
  ]);

  if (myatm.pin === mypin) {
    console.log("Your pin is correct");

    let operationAns = await inquirer.prompt([
      {
        name: 'operation',
        type: "list",
        message: 'Which operation do you want to perform?',
        choices: ['withdraw', 'check balance', 'Add Money']
      }
    ]);

    console.log(operationAns.operation);

    if (operationAns.operation === 'withdraw') {
      let amountAns = await inquirer.prompt([
        {
          name: 'amount',
          type: 'number',
          message: 'How much money do you want to withdraw?'
        }
      ]);

      console.log(amountAns.amount);

      if (amountAns.amount > 0 && amountAns.amount <= balance) {
        balance -= amountAns.amount;
        console.log(`Your remaining balance is ${balance}`);
      } else if (amountAns.amount > balance) {
        console.log("Insufficient balance");
      } else {
        console.log("Invalid amount");
      } 
    } else if (operationAns.operation === 'check balance') {
      console.log(`Your current balance is ${balance}`);
    } else if (operationAns.operation === 'Add Money') {
      let addMoneyAns = await inquirer.prompt([
        {
          name: 'money',
          type: 'number',
          message: 'How much money do you want to add?'
        }
      ]);

      if (addMoneyAns.money > 0) {
        balance += addMoneyAns.money;
        console.log(`Your new balance is ${balance}`);
      } else {
        console.log("Invalid amount");
      }
    } else {
      console.log("Invalid operation");
    }
  } else {
    console.log("Incorrect pin code");
  }
} catch (error) {
  console.error(error);
}