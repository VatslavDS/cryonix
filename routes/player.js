
// The PlayerHandler must be constructued with a connected db
function PlayerHandler(db){
  "use strict";
   var users = db.collection("users");  

};

module.exports = PlayerHandler;
