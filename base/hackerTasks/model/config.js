let query = require("./queryPromise");
let connection = require("./connection");

query("CREATE database if not exists hackertasks")

    .then(rows=>{
        console.log("[2] Database created if it didn't exist");
        return query("USE hackertasks;")
        
    })
    .then(rows=>{

        return query(`
            CREATE TABLE IF NOT EXISTS users
            ( 
                id INT(10) NOT NULL AUTO_INCREMENT,
                username VARCHAR(9) NOT NULL,
                password VARCHAR(65) NOT NULL,
                PRIMARY KEY (id), UNIQUE (username)
            );
        `)

    }).then(rows=>{

        console.log("[3] Created table `users` if it didn't exist");
        return query(`
            CREATE TABLE IF NOT EXISTS site
            ( 
                user_id INT(10) NOT NULL,
                site_id INT(10) NOT NULL AUTO_INCREMENT,
                site VARCHAR(100) NOT NULL,
                data text,
                PRIMARY KEY (site_id)
            );
        `)

    }).then(rows=>{

        console.log("[4] Created table `site` if it didn't exist");

    }).catch(err=>{

        console.log(`An error just occured with message\n${err.message}`);

    })



/*

// ***********************************************************************************
// * Old shit code that I had to replace that does the same thing as above           *
// * I didn't remove it because I wanted to demonstrate why promises are useful.     *
// ***********************************************************************************



connection.query("CREATE database if not exists hackertasks", function(err, result, fields){
    connection.query("USE hackertasks;", (err, rows, fields) => {
        if(err){
            console.log("Couldn't find the database");
        }
        connection.query(`
            CREATE TABLE IF NOT EXISTS users
                ( 
                    id INT(10) NOT NULL AUTO_INCREMENT,
                    username VARCHAR(9) NOT NULL,
                    password VARCHAR(65) NOT NULL,
                    PRIMARY KEY (id), UNIQUE (username)
                );
            `, function(error, results, fields){
                if(error){
                    console.log(error.message)
                }
                connection.query(`
                CREATE TABLE IF NOT EXISTS site
                ( 
                    user_id INT(10) NOT NULL,
                    site_id INT(10) NOT NULL AUTO_INCREMENT,
                    site VARCHAR(100) NOT NULL,
                    data text,
                    PRIMARY KEY (site_id)
                );`, function(err,rows, fields){
                    if(!err){
                        //console.log("EVERYTHING IS SUCCESSFULL")
                        console.log("[2] Added tables and columns if they didn't exist");
                    }
                });
            }
        );
    });
});

*/






module.exports = connection;