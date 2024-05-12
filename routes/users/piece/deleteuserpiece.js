const auth = require("../../../auth/auth");
const deleteuserpieceControllers = require("../../../controllers/piece/deleteuserpieceControllers");

const deleteuserpiece=(app)=>{
    app.delete("/v1/user/:userId/piece/:id",auth,deleteuserpieceControllers)
}
module.exports=deleteuserpiece;