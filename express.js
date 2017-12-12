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
app.get("/searchButtons",function(req,res){
    var sql = 'SELECT * FROM hamme503.search_buttons';
    connection.query(sql,(function(res){return function(err,rows,fields) {
        if(err){console.log("Error obtaining search buttons: ");

                console.log(err);
                res.send(err);
              } else {
                res.send(rows);

              }
    }})(res));

});

app.get("/getProfile",function(req,res){
    var profID = req.param('profID');
    var profName = req.param('profName');
    var sql = 'CALL hamme503.getProfile(' + profID + ", " + profName + ")";
        connection.query(sql, (function(res){return function(err,rows,fields) {
            if (err){console.log("Error retrieving profile data: ");

                    console.log(err);
                    res.send(err);
                  } else {
                    res.send(rows);
                  }

    }})(res));


});

app.get("/getLadder",function(req,res){
  var ladderID = req.param('ladderID');
  var sql = 'call hamme503.getLadder(' + ladderID + ')';
    connection.query(sql, (function(res){return function(err,rows,fields) {
        if(err){console.log("Error retrieving ladder data: ");

                console.log(err);
                res.send(err);
              } else {
                res.send(rows);
              }
    }}) (res) );
} );

app.get("/getGM",function(req,res) {
  var sql = 'call hamme503.getLadder(263456)';
  connection.query(sql, (function(res){return function(err,row,fields) {
      if(err){console.log("Error retrieving ladder data: ");
              console.log(err);
              res.send(err);
            } else {
              res.send(rows);
            }
     }})(res));
 });

app.listen(port);
