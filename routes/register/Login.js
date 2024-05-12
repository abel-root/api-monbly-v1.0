const controllerLogin=require("../../controllers/Login/controllerLogin")
const Login =(app)=>{
    app.post('/v1/login',controllerLogin);
}
module.exports=Login;