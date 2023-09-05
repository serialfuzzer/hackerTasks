let express = require("express")
let router = express.Router();

router.get("/", function(req, res, next){
    let logged_in = 0;
    try{
        logged_in = req.session.loggedIn;
    }catch(e){
        logged_in = 0;
    }
    if(logged_in){
        res.render('index', {loggedIn: logged_in, username: req.session.userInfo.username});
        
    }else{
        res.render('index', {loggedIn: logged_in});
    }
});

module.exports = router;