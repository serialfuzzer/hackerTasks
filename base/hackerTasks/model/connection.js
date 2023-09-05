let mysql = require("mysql");
let credentials = require("./credentials.json");
let process = require("process");

let connection = mysql.createConnection({
    host     : credentials.host,
    user     : credentials.user,
    password : credentials.password
});



connection.connect(
    function(err, success){
        
        if(err){
            console.log(`Error: ${err.message}`);
            process.exit(0);
        }else{
            console.log("[1] Connected to the DB");
        }
    }
);


module.exports = connection;