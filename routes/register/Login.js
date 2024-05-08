const controllerLogin=require("../../controllers/Login/controllerLogin")
const Login =(app)=>{
    app.post('/monbly/login',controllerLogin);
}
module.exports=Login;