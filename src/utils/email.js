const mailer = require("nodemailer");

const config = mailer.createTransport({
    service: "outlook",
    auth: {
        user: "",
        pass: "",
    },
})

async function enviarEmail(email,id){
    await config.sendMail({
        from: config.options.auth.user, 
        to: email, 
        subject: "Recuperação de senha",
        text: `
            Acesse o link abaixo para alterar sua senha

            http://localhost:3333/usuarios/alterar-senha/${id}
        `
    });
}

module.exports = enviarEmail