const auth = require("../../auth/auth");
const deleteTaggControllers = require("../../controllers/tag/deleteTaggControllers");

const deleteTagg=(app)=>{
    app.delete('/monbly/tag/:id/delete',auth,deleteTaggControllers)
}
module.exports=deleteTagg;