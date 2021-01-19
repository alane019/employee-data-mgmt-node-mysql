const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
// all of connection details must match those
// of the MySQL connection that you intend to 
// use to use when running this application.
// example values are provided below 
host: "localhost",
port: 3306,
user: "root", 
password: "root",
database: "employee_cms"
});

