const controllerRegister =require('../../controllers/Register/controllerRegister')

const Register=(app)=>{
    app.post('/v1/register',controllerRegister);
}
module.exports=Register;