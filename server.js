const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

// Import model to sync table with database
// const Schema = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Force true to drop/recreate table(s) on every sync
// sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
// });


inquirer.prompt([{
  type: 'list',
  message: 'What would you like to do?',
  name: 'task',
  choices: [
    'View All Employees', 
    'View All Employees by Department', 
    'View All Employees by Manager', 
    'Add Employee', 
    'Remove Employee', 
    'Update Employee Role', 
    'Update Employee Manager', 
    'View All Roles',
    'Quit'
  ]
}]).then ((question) => {
    console.log (question.task)

    if (question.task === "View All Employees") {
      console.log("Success!")
      viewAllEmployees();
    } else if (question.task === "View All Employees by Department") {
      viewAllEmployeesByDepartment();
    } else if (question.task === "View All Employees by Manager") {
      viewAllEmployeesByManager();
    } else if (question.task === "Add Employee") {
      viewAddEmployee();
    }

    })

    

