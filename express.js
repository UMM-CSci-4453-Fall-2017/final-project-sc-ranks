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

app.get("/insertProfile",function(req,res){
  var profileData = req.param('profileData');
  var sql_1 = 'INSERT INTO hamme503.profiles VALUES ('+profileData[0]+
            ','+profileData[1]+','+profileData[2]+','+profileData[3]+');';
  var sql_2 = 'INSERT INTO hamme503.profileData VALUES ('+profileData[0]+','+
              profileData[4]+','+profileData[5]+','+profileData[6]+','+
              profileData[7]+','+profileData[8]+','+profileData[9]+','+
              profileData[10]+','+profileData[11]+','+profileData[12]+','+
              profileData[13]+','+profileData[14]+')';
  var sql = sql_1 + sql_2;
  connection.query(sql,(function(res){return function(err,rows,fields) {
      if(err){console.log("Error inserting profile data");
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
    }})(res));
});

app.get("/insertLadder",function(req,res){
  var ladderData = req.param('ladderData');
  var loopCounter = 0; // counter to know when we need to send back the http response
  for (var i = 0; i < ladderData.length; i++) {
    var sql = 'INSERT INTO hamme503.ladderData VALUES ('+ladderData[i][0]+','+ladderData[i][1]
              +','+ladderData[i][2]+','+ladderData[i][3]+','+ladderData[i][4]+','+ladderData[i][5]+','
              +ladderData[i][6]+')';
      connection.query(sql, (function(res){return function(err,rows,fields) {
          if(err){console.log("Error retrieving ladder data: ");
                  console.log(err);
                  res.send(err);
                }
          else if (loopCounter == ladderData.length - 1) {
            res.send(rows);
          } else {
            loopCounter++;
          }
      }})(res));
  }
});

app.listen(port);
