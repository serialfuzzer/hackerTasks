let express = require("express")
let app = express.Router();
let connection = require("../model");
let bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }))


app.get("/:id", function(req,res,next){
    if(req.session.loggedIn){
        var id = req.params.id;
        connection.query(`SELECT * FROM site where site_id = ?;`, [id], function(err, result, field){
            res.render('list', {website: result[0].site || "", site_id: result[0].site_id});
        });
    }else{
        res.redirect("/");
    }
});

app.post("/addlist/:id", function(req,res,next){
    var string = req.body.data || "";
    var siteId = req.params.id;
    if(req.session.loggedIn){
        var userId = req.session.userInfo.id;
        connection.query(`SELECT user_id from site where site_id = ?;`, [siteId], function(err, rows, field){
            if(!err){
                var result = rows[0] || {};
                if (result.user_id === userId){
                    connection.query("UPDATE site SET data=? where site_id=?", [string, siteId], function(err,rows, data)
                    {
                        if(!err){
                            res.send({
                                message: "success"
                            })
                        }else{
                            res.send({
                                message: err.message
                            });
                        }
                    });
                }else{
                    res.send({
                        message: "You don't own this instance."
                    })
                }
            }
        });
    }else{
        res.redirect("/");
    }
});


app.get("/active/:site_id", function(req, res, next){
    var siteId = req.params.site_id;
    var error = "Error at /active/:site_id"
    if(req.session.loggedIn){
        var user_id = req.session.userInfo.id;
        connection.query("SELECT data from site where site_id = ? and user_id = ?;", [siteId, user_id], function(err,rows,fields){
            if(!err && rows.length > 0){
                res.send(rows[0].data)
            }else{
                res.send({"message": err.message || error})
            }
        });
    }else{
        res.redirect("/");
    }
})

module.exports = app;