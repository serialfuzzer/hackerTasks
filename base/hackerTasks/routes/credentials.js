let express = require("express")
let app = express.Router();
let connection = require("../model");
let bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }))


app.get("/get", function(req, res, next){
    if(req.session.loggedIn){
        connection.query(`
            SELECT * from credentials where user_id=?;
        `,[req.session.userInfo.id], function(err, result, field){
            if(!err){
                res.json(result);
            }else{
                res.json({status: err.message});
            }
        });
        
    }
})

app.get("/getBySiteID/:site_id", function(req, res, next){
    if(req.session.loggedIn){
        var site_id = req.params.site_id
        connection.query(`
            SELECT * from credentials where user_id=? and site_id = ?;
        `,[req.session.userInfo.id, site_id], function(err, result, field){
            if(!err){
                res.json(result);
            }else{
                res.json({status: err.message});
            }
        });
        
    }
})

app.get("/getCreds/:site_id", function(req, res, next){
    if(req.session.loggedIn){
        var site_id = req.params.site_id
        res.render('credentials', {site_id});        
    }
})

app.post("/add", function(req, res, next) {
    if(req.session.loggedIn){
        let siteId = req.body.site || '';
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let description = req.body.description;
        if(siteId){
            let userid = req.session.userInfo.id;
            let query = `INSERT INTO credentials (user_id, site_id, username, email, password, description) 
            VALUES (?, ?, ?, ?, ?, ?);`
            connection.query(query, [userid, siteId, username, email, password, description], function(err, result, field){
                if(!err){
                    res.send({message: "success"})
                }else{
                    res.send({message: err.message});
                }
            });
        }else{
            let message = "Site cannot be empty.";
            res.send({
                message
            })
        }
    }else {
        res.send({
            "message": "You are not logged in."
        })
    }
}); 


app.post("/remove/", function(req, res, next){
    if(req.session.loggedIn){
        let id = req.body.id || 0;
        if(Number(id)){
            connection.query(`DELETE FROM credentials where id=${id} and user_id=${req.session.userInfo.id};`,
            function(err, rows, fields){
                if(!err){
                    res.send({
                        deleted: rows.affectedRows
                    })
                }else{
                    res.send({
                        deleted: 0
                    })
                }
            }
            )
        }
    }else{
        res.send({message:"Error, you are not logged in"});
    }
});


module.exports = app;