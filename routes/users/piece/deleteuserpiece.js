const auth = require("../../../auth/auth");
const deleteuserpieceControllers = require("../../../controllers/piece/deleteuserpieceControllers");

const deleteuserpiece=(app)=>{
    app.delete("/monbly/user/:userId/piece/:id",auth,deleteuserpieceControllers)
}
module.exports=deleteuserpiece;