const mysql = require("mysql2");
const inquirer = require("inquirer");
const ui = require("./lib/ui");  
require("console.table");

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

ui.displayTitle("Employee Data Mgmt - with Node.JS and MySQL");

connection.connect(err => {
	if(err) {
		return console.log(err);
	}
	else {
        ui.logStartLine();
        console.log(` user: ${connection.config.user}`);
        console.log(` connected to database: ${connection.config.database}`);
        console.log(` on port: ${connection.config.port}`);
        console.log(` using host: ${connection.config.host}`);
        ui.logEndLine();
        waitThenRun(1000);
	}
}); 

var questions = [{   
        name: "selection",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
                "View department table",
                "View role table",
                "View employee table",
                "Add new department",
                "[End connection]"
        ]
        },
        {
            type: "input",
            name: "newDeptName",
            message: "Enter new department name: ",
            when: function (answers) {
                return answers.selection == "Add new department";
            }
        }
    ];

function startInquiry() {
    inquirer.prompt(questions)
    .then(function(answers) {
        if(answers.selection == "View department table") {
            viewDept(); 
            return;
        }
        else if(answers.selection == "View role table") {
            viewRole();
            return;
        }  
        else if(answers.selection == "View employee table") {
            viewEmpl();
            return;
        }
        else if(answers.selection == "Add new department") {
            addDept(answers);
            return;
        }
        else if(answers.selection == "[End connection]") {
            endConnection();
            return;
        }    
    });
}

viewDept = () =>  {
    connection.query("SELECT * FROM department", (error, data) => {
        if (error) { console.log("ERROR: ", error);
        }
        else{
            ui.logStartLine();
            console.log("    D e p a r t m e n t  T a b l e ");
            ui.logEndLine();
            console.table(data);
            ui.logEndLine();
            console.log();
            waitThenRun(1000);
        }
    });  
}


viewRole = () =>  {
    connection.query("SELECT * FROM role", (error, data) => {
        if (error) { console.log("ERROR: ", error);
        }
        else{
            ui.logStartLine();
            console.log("    R o l e  T a b l e ");
            ui.logEndLine();
            console.table(data);
            ui.logEndLine();
            console.log();
            waitThenRun(1000);
        }
    });
}

viewEmpl = () =>  {
    connection.query("SELECT * FROM employee", (error, data) => {
        if (error) { console.log("ERROR: ", error);
        }
        else{
            ui.logStartLine();
            console.log("    E m p l o y e e   T a b l e ");
            ui.logEndLine();
            console.table(data);
            ui.logEndLine();
            console.log();
            waitThenRun(1000);
        }
    });
}

let getCountOnColumn = function(checkVal, onTable, onColumn){
        if(onTable == "department" && onColumn == "deptid"){
            connection.query("SELECT sum(*) FROM department where ?",[
                {deptid: checkVal}
            ], function(err, results) {
                if (err) throw err;
                console.log(results.affectedRows + " affected rows. \n");
                console.log("Results: \n");
                console.log(results);
            });
        }
        if(onTable == "department" && onColumn == "name"){
            connection.query("SELECT sum(*) FROM department where ?",[
                {name: checkVal}
            ], function(err, results) {
                if (err) throw err;
                console.log(results.affectedRows + " affected rows. \n");
                console.log("Results: \n");
                console.log(results);
            });
        }
 

    if(onTable == "role"){
        console.log(" not implemented for table: " + onTable);
    }

    if(onTable == "employee"){
        console.log(" not implemented for table: " + onTable);
    }
}






/*
  connection.query("SELECT * FROM auctions", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {


*/


addDept = (inquirerQuestions) =>  {
    let newDeptNameText = inquirerQuestions.newDeptName;
     var query = connection.query("INSERT INTO department SET ?",
     [
         {
            name: newDeptNameText
         }
     ],
     function(err, res){
         if (err) throw err;
         console.log(res.affectedRows + " row inserted \n");
        waitThenRun(1000);
     })
};  
 


// end connection
endConnection = () =>  {
    ui.logStartLine();
    (err) => {
        if(err) throw err;
        else {
            connection.end();
            ui.logStartLine();
            console.log(" Connection ended ")
            ui.logEndLine();
        }
    }
}

let waitThenRun =  function(millesec){
    setTimeout(function() {
        startInquiry();
    }, millesec);   
}
