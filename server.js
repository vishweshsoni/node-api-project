var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var md5 = require("md5");
var rest = require("./rest.js");
var app = express();

function REST() {
  var self = this;
  self.connectMyssql();
};
REST.prototype.connectMyssql = function() {
  var self = this;
  var pool = mysql.createPool({
      connectionLimit:100,
      host:'localhost',
      user:'root',
      password:'',
      database:'login1',
      debug:false
  });
  pool.getConnection(function (err,connection) {
    if(err){

          self.stop(err);
          console.log(err);

    }else{
          self.configureExpress(connection);
    }
  });
}
REST.prototype.configureExpress = function (connection) {
    var self=this;
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(bodyparser.json());
    var router =express.Router();
    app.use('/api',router);
    var rest_router=new  rest(router,connection,md5);
    self.startServer();
      }

   REST.prototype.startServer = function () {
      app.listen(3000,function () {
         console.log("all right i'm alive");
      });
   }


   REST.prototype.stop = function (err) {
     console.log("Issue with mysql :"+err);
     process.exit(1);
   };
new REST();
