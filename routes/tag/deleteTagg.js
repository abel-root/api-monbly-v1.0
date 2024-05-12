const auth = require("../../auth/auth");
const deleteTaggControllers = require("../../controllers/tag/deleteTaggControllers");

const deleteTagg=(app)=>{
    app.delete('/v1/tag/:id/delete',auth,deleteTaggControllers)
}
module.exports=deleteTagg;