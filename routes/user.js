let express = require("express");
let app = express.Router();
let bodyParser = require("body-parser");
let connection = require("../model");
let crypto = require("crypto");
let events = require("events");



app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", function(req, res, next){
    res.send(req.session);
});

app.post("/login", function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    console.log(`token: ${res.locals.csrfToken} === formToken: ${req.body._csrf}`);
    checkLogin(username, password, req, res);
});


app.post("/register", function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    let password1 = req.body.password1;
    let error = "Dissimilar password";
    if(password === password1){
        if(username.length>9){
            let err = "Username cant be more than 9 characters";
            res.send({
                err
            })
            return;
        }
        addUser(username, password, req, res);
    }else{
        res.send({error})
    }
});


app.get("/logout", function(req,res,next){
    req.session.loggedIn = 0;
    res.redirect("/");
});

function addUser(username, password, req, res) {
    connection.query(`
    INSERT INTO users (username, password)
        VALUES (?, ?); 
    `,[username, hashFunction(password)],function(err, rows, fields){
        if(!err){
            let obj = {
                "status": "success",
                "username": `${username}`
            };
            res.redirect("/");
        }else{
            let obj = {
                "status": err.message.indexOf("Duplicate") > 0 ? "Error": err.message
            };

            res.send(obj);
        }
    });
}



function checkLogin(username, password, req, res){
    connection.query("SELECT * from users where username=? and password=?", [username, hashFunction(password)],
     function(err, result, field){
        if(!err){
            if(result.length > 0){
                if(result[0].username === username){
                    let id = result[0].id;
                    let message = 'Success';
                    req.session.loggedIn = 1;
                    req.session.userInfo = {id, username};
                    res.redirect("/");
                    /*res.send({
                        message
                    })*/
                }
            }else{ // if wrong username or password
                let message = 'Error';
                res.redirect("/")
            }
        }
     });
}

function hashFunction(secret){
    secret += "$@SALT123@$";
    return crypto.createHmac('sha256', secret).digest('hex');
}


function addLoginSession(username, req){
    connection.query(`SELECT id from users where username=?`, [username], function(err, rows, fields){
        let id = rows[0].id;
        req.session.user = {
            id,
            loggedIn: 1
        };
    });
}

module.exports = app;