const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }

})


module.exports = {
    confirmRegister: async (data) => {

        const { email, name, token } = data;

        try {
            await transporter.sendMail({
                from: "damykirablack@gmail.com",
                to: email,
                subject: "Confirma tu cuenta",
                text: `Confirma tu cuenta`,
                html: `<p>Hola ${name}, para confirmar tu cuenta haz click en el siguiente enlace: </p>
                <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a>`

            })
            console.log("Mensaje enviado")
        } catch (error) {
            console.log(error);
        }
    },
    forgotPassword: async (data) => {
        const { email, name, token } = data;

        try {
            await transporter.sendMail({
                from: "damykirablack@gmail.com",
                to: email,
                subject: "Recuperar contraseña",
                text: `Recuperar contraseña`,
                html: `<p>Hola ${name}, para recuperar tu contraseña haz click en el siguiente enlace: </p>
                <a href="${process.env.FRONTEND_URL}/recover-password/${token}">Recuperar contraseña</a>`
            })
        } catch (error) {
            console.log(error);
        }
    }
}
