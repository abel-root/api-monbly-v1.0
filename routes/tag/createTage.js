const auth = require("../../auth/auth");
const createTageController = require("../../controllers/tag/createTageController");

const createTage=(app)=>{
    app.post("/v1/tag/:conducteurId/add",auth,createTageController)
}

module.exports=createTage;