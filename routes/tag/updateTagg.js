const auth = require("../../auth/auth")
const updateTaggControllers = require("../../controllers/tag/updateTaggControllers")

const updateTagg=(app)=>{
    app.put('/v1/tag/:id/update',auth,updateTaggControllers)
}
module.exports=updateTagg