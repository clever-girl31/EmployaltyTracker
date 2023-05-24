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
  )
}
  
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
        var newDeptId = results[0].count + 1
        
        connection.query (`INSERT INTO department (id, name) VALUES (${newDeptId}, "${answers.newDept}")`, function(err) {
          if (err) {
            console.error(err)
          } else {
            console.log(`New department "${answers.newDept}" successfully added.`)
            backOrQuit();
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

const deptList = []
function getDepts() {
  connection.query('SELECT * FROM `department`', function (err, results) {
    if (err) {
      console.error(err);
      } else {
      for (let i = 0; i < results.length; i++) {
        deptList.push(results[i].name)
      }}})
}
getDepts()


function addRole() {
  console.log(deptList)
  inquirer
    .prompt([{
      type: 'input',
      name: 'newRole',
      message: 'Enter new role name:',
    },{
      type: 'input',
      name: 'salary',
      message: 'Enter salary for new role:'
    }, {
      type: 'list',
      name: 'dept',
      message: 'Choose parent department for new role:',
      choices: deptList,
    }])
    .then((answers) => {
      connection.query('SELECT COUNT(*) AS count FROM role', function (err, results) {
        console.log(results[0].count)
        var newRoleId = results[0].count + 1
        var deptId = deptList.indexOf(answers.dept) + 1

        connection.query(`INSERT INTO role (id, title, salary, department_id) VALUES (${newRoleId}, "${answers.newRole}", ${answers.salary}, ${deptId})`, function (err) {
          if (err) {
            console.error(err)
          } else {
            console.log(`New role "${answers.newRole}" successfully added.`)
            backOrQuit()
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

const roleList = []
function getRoles() {
  connection.query('SELECT * FROM `role`', function (err, results) {
    if (err) {
      console.error(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        roleList.push(results[i].title)
      }
    }
  })
}
getRoles()

const empList = []
function getEmps() {
  connection.query('SELECT * FROM `employee`', function (err, results) {
    if (err) {
      console.error(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        empList.push(results[i].first_name + ' ' + results[i].last_name)
      }
    }
  })
}
getEmps()

function addEmployee() {
  inquirer
    .prompt([{
      type: 'input',
      name: 'newFirst',
      message: 'Enter new employee first name:',
    }, {
      type: 'input',
      name: 'newLast',
      message: 'Enter new employee last name:'
    }, {
      type: 'list',
      name: 'role',
      message: 'Choose new employee role:',
      choices: roleList,
    }, {
      type: 'list',
      name: 'mgr',
      message: 'Choose new employee manager:',
      choices: empList
    }])
    .then((answers) => {
      connection.query('SELECT COUNT(*) AS count FROM employee', function (err, results) {
        var roleId = roleList.indexOf(answers.role) + 1
        var mgrId = empList.indexOf(answers.mgr) + 1
        var newEmpId = results[0].count + 1

        connection.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${newEmpId}, "${answers.newFirst}", "${answers.newLast}", ${roleId}, ${mgrId})`, function (err) {
          if (err) {
            console.error(err)
          } else {
            console.log(`New employee "${answers.newFirst} ${answers.newLast}" successfully added.`)
            backOrQuit()
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
    console.log('***Viewing Departments***\n')
    viewDepts();
  };
  if (answers.q1 === 'View all roles') {
    console.log('***Viewing Roles***\n')  
    viewRoles();
  } 
  if (answers.q1 === 'View all employees') {
    console.log('***Viewing Employees***\n') 
    viewEmployees();
  }
  if (answers.q1 === 'Add a department') {
    console.log('***Add Department***\n')
    addDepartment();
  }
  if (answers.q1 === 'Add a role') {
    console.log('***Add Role***\n')
    addRole();
  }
  if (answers.q1 === 'Add an employee') {
    console.log('running addEmployee()')
     addEmployee();
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