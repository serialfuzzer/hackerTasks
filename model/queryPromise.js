let connection = require("./connection");


function query(query){
    return new Promise(function(resolve, reject){
        connection.query(query, function(err, rows, field){
            if(!err){
                resolve(rows);
            }else{
                reject(err);
            }
        });
    });
}

module.exports = query;