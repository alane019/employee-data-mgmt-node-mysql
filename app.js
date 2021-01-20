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
        setTimeout(function () {
            startInquiry();
        }, 3000); 
	}
}); 


function startInquiry() {
    inquirer.prompt({
        name: "selection",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View department table",
            "View role table",
            "View employee table",
            "[End connection] "
        ]
    }).then((answer) => {
        if(answer.selection == "View department table") {
            viewDept(); return;
        }
        else if(answer.selection == "View role table") {
            viewRole();
            return;
        }  
        else if(answer.selection == "View employee table") {
            viewEmpl();
        }
        else if(answer.selection == "[End connection] ") {
            endConnection();
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
            startInquiry();
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
            startInquiry();
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
            startInquiry();
        }
    });
}


// end connection
endConnection = () =>  {
    ui.logStartLine();
    console.log(" Connection ended ")
    ui.logEndLine();
    connection.end();
}

