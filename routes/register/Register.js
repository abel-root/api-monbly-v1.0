const controllerRegister =require('../../controllers/Register/controllerRegister')

const Register=(app)=>{
    app.post('/monbly/register',controllerRegister);
}
module.exports=Register;