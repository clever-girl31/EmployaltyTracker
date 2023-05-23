const cTable = require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'company_db'
});



function viewDepts() {
  connection.query('SELECT * FROM `department`', function (err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      console.table(results)
      backOrQuit();
    }
  }
)}

function backOrQuit() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'backOrQuit',
          message: 'Select',
          choices: ['Return to Menu', 'Quit']
        }
      ])
      .then((answers) => {
        if (answers.backOrQuit === 'Return to Menu') {
          runProgram();
        }
        if (answers.backOrQuit === 'Quit') {
          process.exit();
        }
      })
  }

function handleResponse(answers) {
  if (answers.q1 === 'View all departments') {
    console.log('VIEWING DEPARTMENTS\n')
    viewDepts();
  };
  if (answers.q1 === 'View all roles') {
    console.log('running viewRoles()')  
    // viewRoles();
  } 
  if (answers.q1 === 'View all employees') {
    console.log('runing viewEmployees()') 
    // viewEmployeees();
  }
  if (answers.q1 === 'Add a department') {
    console.log('running addDepartment()')
    // addDepartment();
  }
  if (answers.q1 === 'Add a role') {
    console.log('running addRole()')
    // addRole();
  }
  if (answers.q1 === 'Add an employee') {
    console.log('running addEmployee()')
    //  addEmployee();
  }
  if (answers.q1 === 'Update an employee role') {
    console.log('running updateEmpRole()')
    // updateEmpRole();
  }
  if (answers.q1 === 'Quit') {
    process.exit();
  }
}

function runProgram() {
  inquirer
    .prompt([ {
      type: 'list',
      name: 'q1',
      message: 'Choose from the following options:',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
    ]
    )
    .then((answers) => {
      console.log(answers.q1)
      handleResponse(answers);
    })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('error')
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })};

  runProgram()