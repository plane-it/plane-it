const mailer = require("nodemailer");

const config = mailer.createTransport({
    service: "outlook",
    auth: {
        user: "Andreylrodrigues@hotmail.com",
        pass: "andrey050405",
    },
})

async function enviarEmail(email,id){
    await config.sendMail({
        from: config.auth.user, 
        to: email, 
        subject: "Recuperação de senha",
        text: `
            Acesse o link abaixo para alterar sua senha

            http://localhost:3333/recuperar-senha/${id}
        `
    });
}

module.exports = enviarEmail