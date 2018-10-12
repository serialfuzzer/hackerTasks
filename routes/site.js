let express = require("express")
let app = express.Router();
let connection = require("../model");
let bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }))


app.get("/get", function(req, res, next){
    if(req.session.loggedIn){
        connection.query(`
            SELECT * from site where user_id=?;
        `,[req.session.userInfo.id], function(err, result, field){
            if(!err){
                res.json(result);
            }else{
                res.json({status: err.message});
            }
        });
        
    }
})

app.post("/add", function(req, res, next) {
    if(req.session.loggedIn){
        let site = req.body.site || '';
        if(site){
            let userid = req.session.userInfo.id;
            connection.query(`INSERT INTO site VALUES(?, 0, ?, "");`, [userid, site], function(err, result, field){
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
        let problem_id = req.body.pid || 0;
        if(Number(problem_id)){
            connection.query(`DELETE FROM site where site_id=${problem_id} and user_id=${req.session.userInfo.id};`,
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