var mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
  var self = this;
  self.handelRoutes(router, connection, md5);
}
REST_ROUTER.prototype.handelRoutes = function(router, connection, md5) {
    router.get("/", function(req, res) {
      res.json({
        "message": "hello world"
      });
    });
    router.post("/login", function(req, res) {
      var user = req.body.username;
      var passsword = req.body.passsword;
      var query = "SELECT * FROM log WHERE ??=?";
      var table = ["username", user];
      query = mysql.format(query, table);

      connection.query(query, function(error, results) {
        if (error) {
          // res.json({"error":true,
          //            "message":"error executing the mysql query"});
          console.log(error);

        } else {
          res.json({
            "error": false,
            "message": "Success",
            "users": results
          });
        }
      });

    });
    router.post("/signup", function(req, res) {
          var user = {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
          };
          var query = "INSERT INTO log set ?";
          var table = [user];
          query = mysql.format(query, table);
          connection.query(query, function(error, results) {
            if (error) { // res.json({"error":true,
              //            "message":"error executing the mysql query"});
              console.log(error);
            } else {
              res.json({
                "error": false,
                "message": "Success",
                "users": results
              });
            }

          });


        });
      }
        module.exports = REST_ROUTER;
