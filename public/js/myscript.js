$(window).ready(function(){


    const TABBING = (function(){ // this IIFE adds the feature tabbing login and registration form
        var loginBtn = $(".loginBtn");
        var regBtn = $(".regBtn");
        var login = $(".login");
        var register = $(".register");

        loginBtn.on("click", function() {
            loginBtn.addClass("active");
            regBtn.removeClass("active");
            register.addClass("collapse");
            login.removeClass("collapse");
        });

        regBtn.on("click", function() {
            regBtn.addClass("active");
            loginBtn.removeClass("active");
            login.addClass("collapse");
            register.removeClass("collapse");
        });
        
        return true;
    })();

});