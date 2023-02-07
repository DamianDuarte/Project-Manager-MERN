const createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const User = require('../database/models/User');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require('../helpers/generateJWT');
const { confirmRegister, forgotPassword } = require('../helpers/sendMails');


module.exports = {
    register : async (req,res) => {
        try {

            const { name, email, password } = req.body;

            if([name, email, password].includes("")){
                throw createError(400, "Todos los campos son obligatorios");
            }

            let user = await User.findOne({ email });
            console.log(user);

            if(user){
                throw createError(400, "El usuario ya existe");
            }

            const token = generateTokenRandom();

            user = new User(req.body);
            user.token = token;

            const userStored = await user.save();


            await confirmRegister({
                email : userStored.email,
                name : userStored.name,
                token : userStored.token
            })



            return res.status(201).json({
                ok : true,
                msg :'Usuario Registrado. Se ha enviado un email para confirmar su usuario',
                data : userStored
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'REGISTER')
        }
       
    },
    login : async (req,res) => {

        const { email, password } = req.body;
        
        try {          
            
            if([email, password].includes("")){
                let error = createError(400, "Todos los campos son obligatorios");
            }

            let user = await User.findOne({ email });
                
            
            if(!user){
                throw createError(403, "Credenciales incorrectas | EMAIL");
            }
            
            if(!user.checked){
                throw createError(403, "Tu cuenta no ha sido verificada");
            }
            
            if(!await user.checkedPassword(password)){
                throw createError(404, "Credenciales incorrectas | PASSWORD");
            }



            return res.status(200).json({
                ok : true,
                msg :'Usuario Logueado',
                user : {
                    nombre : user.name,
                    email : user.email,
                    token : generateJWT(
                        {
                            id : user._id,
                        }
                    ),
                }
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'LOGIN')
            
        }
       
    },
    checked : async (req,res) => {

        const { token } = req.query;  
        try {

            if(!token){
                throw createError(400, "Token inexsistente");
            };

            const user = await User.findOne({ token });

            if(!user){
                throw createError(400, "Token invalido");
            }

            if(token !== user.token){
                throw createError(400, "Token incorrecto");
            }

            user.checked = true;
            user.token = "";

            await user.save();

            return res.status(201).json({
                ok : true,
                msg :'Registro verificado exitosamente'
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'CHECKED')
        }
       
    },
    sendToken : async (req,res) => {

        const { email } = req.body;



        try {

            let user = await User.findOne({email});

            if(!user){
                throw createError(400, "Email incorrecto");
            }

            const token = generateTokenRandom();

            user.token = token;
            await user.save();

            // TODO: ENVIAR EMAIL PARA REESTABLECER LA CONTRASEÑA 

            await forgotPassword({
                email : user.email,
                name : user.name,
                token : user.token
            });


            return res.status(200).json({
                ok : true,
                msg :'Se ha enviado un email para reestablecer la contraseña'
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'SENDTOKEN')
        }
    },
    verifyToken : async (req,res) => {
        try {

            const { token } = req.query;

            if(!token) throw createError(400, "Token inexsistente");

            const user = await User.findOne({ token });

            if(!user) throw createError(400, "Token invalido");



            return res.status(200).json({
                ok : true,
                msg :'Token verificado'
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'VERIFYTOKEN')
        }
    },
    changePassword : async (req,res) => {
        try {

            const { token } = req.query;
            const { password } = req.body;

            if(!password) throw createError(400, "Todos los campos son obligatorios");
            

            const user = await User.findOne({ token });

            if(!user) throw createError(400, "Token invalido");

            user.password = password;
            user.token = "";

            await user.save();

            return res.status(200).json({
                ok : true,
                msg :'Password actualizado exitosamente'
            })
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, 'CHANGEPASSWORD')
        }
    },
}