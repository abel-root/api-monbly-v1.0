const auth = require("../../../auth/auth");
const controllerUserPiece = require("../../../controllers/piece/contollerUserPiece");
const upload=require('../../../upload')

const UserAjoutePieceIdentite=(app)=>{
    app.post("/monbly/identite/:userId",upload.fields([{ name: 'recto', maxCount: 1 }, { name: 'verso', maxCount: 1 }]),auth,controllerUserPiece);
}
module.exports=UserAjoutePieceIdentite;