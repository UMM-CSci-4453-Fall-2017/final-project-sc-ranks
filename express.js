async = require("async");

var express=require('express'),
mysql=require('mysql'),
    credentials=require('./credentials.json'),
    app = express(),
    port = process.env.PORT || 1337;

credentials.host='ids.morris.umn.edu';

var connection = mysql.createConnection(credentials);

connection.connect(function(err){if(err){console.log(error)}});

app.use(express.static(__dirname + '/src'));
app.get("/buttons",function(req,res){
    var sql = 'SELECT * FROM hamme503.search_buttons';
    connection.query(sql,(function(res){return function(err,rows,fields) {
        if(err){console.log("Error obtaining search buttons: ");
                console.log(err);}
    }})(res));

});

app.get("getProfile",function(req,res){
    var profID = req.param('profID');
    var profName = req.param('profName');
    var sql = 'CALL hamme503.getProfile(' + profID + ", " + profName + ")";
        connection.query(sql, function(err,row,fields) {
            if(err){console.log("Error retrieving profile data: ");
                    console.log(err);}
        });
    }(res));


});
