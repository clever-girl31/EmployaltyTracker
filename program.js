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

function viewRoles() {
  connection.query('SELECT * FROM `role`', function (err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      console.table(results)
      backOrQuit();
    }
  }
  )
}

function viewEmployees() {
  connection.query('SELECT * FROM `employee`', function (err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      console.table(results)
      backOrQuit();
    }
  }
  )
}

function addDepartment() {
  inquirer
    .prompt ([ {
        type: 'input',
        name: 'newDept',
        message: 'Enter new department name:',
    }])
    .then((answers) => {
      console.log(answers.newDept)
      connection.query('SELECT COUNT(*) AS count FROM department', function(err, results) {
          console.log(results[0].count)
          var newDeptId = results[0].count + 1

          connection.query (`INSERT INTO department (id, name) VALUES (${newDeptId}, "${answers.newDept}")`, function(err) {
            if (err) {
              console.error(err)
            } else {
              console.log(`New department "${answers.newDept}" successfully added.`)
            }
          })
      })
    })
    .catch((error) => {
      if (error.isTtyError) {
      console.error(err)
    }
  })
};

// function addRole() {
//   inquirer
//     .prompt([{
//       type: 'input',
//       name: 'newRole',
//       message: 'Enter new role name:',
//     }])
//     .then((answers) => {
//       console.log(answers.newRole)
//       connection.query('SELECT COUNT(*) AS count FROM role', function (err, results) {
//         console.log(results[0].count)
//         var newRoleId = results[0].count + 1

//         connection.query(`INSERT INTO role (id, name) VALUES (${newDeptId}, "${answers.newDept}")`, function (err) {
//           if (err) {
//             console.error(err)
//           } else {
//             console.log(`New department "${answers.newDept}" successfully added.`)
//           }
//         })
//       })
//     })
//     .catch((error) => {
//       if (error.isTtyError) {
//         console.error(err)
//       }
//     })
// };

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
    console.log('~~~Viewing Departments~~~\n')
    viewDepts();
  };
  if (answers.q1 === 'View all roles') {
    console.log('~~~Viewing Roles~~~\n')  
    viewRoles();
  } 
  if (answers.q1 === 'View all employees') {
    console.log('~~~Viewing Employees~~~') 
    viewEmployees();
  }
  if (answers.q1 === 'Add a department') {
    console.log('running addDepartment()')
    addDepartment();
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