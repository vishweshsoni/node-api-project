var mysql=require("mysql");

function REST_ROUTER(router,connection,md5) {
var self=this;
self.handelRoutes(router,connection,md5);
}
REST_ROUTER.prototype.handelRoutes = function (router,connection,md5) {
 router.get("/",function(req,res) {
     res.json({"message":"hello world"});
 });
 router.post("/login",function(req,res) {
       
      connection.query(query,function (error,results) {
          if(error){
               // res.json({"error":true,
               //            "message":"error executing the mysql query"});
              console.log(error);

          }
          else{
              res.json({"error":false,
                         "message":"Success",
                          "users":results});
          }
      });

 });
 router.post("/signup",function (req,res) {


    if(error){// res.json({"error":true,
   //            "message":"error executing the mysql query"});
  console.log(error);
}  else{
      res.json({"error":false,
                 "message":"Success",
                  "users":results});
  }
 });


}
module.exports=REST_ROUTER;
