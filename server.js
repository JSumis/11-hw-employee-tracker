// const express = require('express');
// const mysql = require('mysql');
const inquirer = require("inquirer");
const table = require("console.table");
const connection = require("./config/connection.js");

// Import model to sync table with database
// const Schema = require('./db/schema');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Force true to drop/recreate table(s) on every sync
// // sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// // });

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "task",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Quit",
        ],
      },
    ])
    .then((question) => {
      console.log(question.task);

      if (question.task === "View All Employees") {
        // console.log("Success!");
        viewAllEmployees();
      } else if (question.task === "View All Employees by Department") {
        viewAllEmployeesByDepartment();
      } else if (question.task === "View All Employees by Manager") {
        viewAllEmployeesByManager();
      } else if (question.task === "Add Employee") {
        addEmployee();
      }
        else if (question.task === "Add Department") {
        addDepartment();
      } else if (question.task === "Add Role") {
        addRole();
      }
    });
}

async function viewAllEmployees() {
  await connection.query(
    "SELECT * FROM employee",
    function (error, results, field) {
      console.log("View All Employee works!", results);
      console.table(results);
    }
  );
  init();
}

async function viewAllEmployeesByDepartment() {
  await connection.query(
    "SELECT * FROM department",
    function (error, results, field) {
      console.table(results);
    }
  );
  init();
}

async function viewAllEmployeesByManager() {
  await connection.query(
    "SELECT * FROM manager",
    function (error, results, field) {
      console.table(results);
    }
  );
  init();
}
//INSERT INTO `table_name`(column_1,column_2,...) VALUES (value_1,value_2,...);

async function addEmployee() {
  let employeeRoleID = await connection.query(
    "Select * FROM role inner join department on department.id = role.department_id"
  );
  console.log(employeeRoleID)
  // let managerID = await connection.query(
  //   "Select * FROM employee"
  // )
  let newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "firstname",
      message: "Enter first name",
    },
    { 
      type: "input", 
      name: "lastname", 
      message: "Enter last name" },

    {
      type: "list",
      name: "role_ID",
      message: "Choose role id",
      choices: employeeRoleID,
    },
    // {
    //   type: "list",
    //   name: "manager_ID",
    //   message: "Choose manager id",
    //   choices: managerID,
    // },
  ]);
  console.log(newEmployee);
  await connection.query(
    `INSERT INTO 'employee'(firstName, lastName, role_ID) VALUES (${newEmployee.firstname}, ${newEmployee.lastname}, ${newEmployee.role_ID})`,
    function (error, results, field) {
      console.table(results);
    }
  );
  init();
}

async function addDepartment() {
  let newDepartment = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Enter department name",
    },
  ])
  
  // console.log(newDepartment);
  await connection.query(
    `INSERT INTO department(name) VALUES ('${newDepartment.department_name}')`,
    function (error, results, field) {
      if (error) console.log(error);
      // console.log(results);
    }
  )
  init();
}
async function addRole() {
  // let departments;
  //   await connection.query(
  //   `SELECT * from department`,
  //   function (error, results, field) {
  //     if (error) console.log(error);
  //     departments = [...new Set(results.map((item) => ({name: item.name, value: item.id})))];
  //     console.log(departments);
  //   }
  // )

  // let roleDepartment = await inquirer.prompt ([
  //   {
  //     type: "list",
  //     message: "Enter the department for this role",
  //     name: "department_role",
  //     choices: departments.map(({name,value}) => ({name, value})),
  //   }
  // ])
  // console.log(roleDepartment)
  // let newRole = await inquirer.prompt([
  //   {
  //     type: "input",
  //     name: "role_name",
  //     message: "Enter role name",
  //   },
  // ])
  const searchDept = await connection.query('SELECT id, name from department;')
  const deptArray = [... new Set((searchDept.map(dept => ({id: dept.id, name: dept.name}))))]
  const query = await inquirer.prompt([
    {
      type: 'list',
      name: 'department_id',
      message: 'What department will this role be in?',
      choices: deptArray.map(({id,name}) => ({name,value:id}))
    },{
      type: 'input',
      name: 'title',
      message: 'What is the tile of this role?'
    },{
      type: 'input',
      name: 'salery',
      message: 'What is the salery?'
    }
  ])
  await connection.query(`INSERT INTO role(title, salery, department_id) VALUES ('${query.title}', '${query.salery}', '${query.department_id}')`,
  function (error, results, field) {
    if (error) console.log(error);
    init();
  })
 
}
// within get department ids and names pass in inq prompt(connection.query set to a variable and pass into inq prompt)

init();

// const search = await connection.query('SELECT title FROM role');
