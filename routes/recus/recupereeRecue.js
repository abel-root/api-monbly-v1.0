const auth = require("../../auth/auth")
const recupereeRecueCTRL = require("../../controllers/recus/recupereeRecueCTRL")

const recupereeRecue=(app)=>{
   app.get("/monbly/:userId/recu",auth,recupereeRecueCTRL);
}
module.exports=recupereeRecue