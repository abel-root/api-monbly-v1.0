const auth = require("../../auth/auth");
const createTageController = require("../../controllers/tag/createTageController");

const createTage=(app)=>{
    app.post("/monbly/tag/:conducteurId/add",auth,createTageController)
}

module.exports=createTage;