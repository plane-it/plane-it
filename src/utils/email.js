const mail = require("node-mailer")

const config = mail.createTransport({
    service: "outlook",
    auth: {
        user: "",
        pass: "",
    },
})

async function enviarEmail(email,id){
    await config.sendMail({
        from: 'Andreylrodrigues@hotmail.com', 
        to: email, 
        subject: "Recuperação de senha",
        text: `
            Acesse o link abaixo para alterar sua senha

            http://localhost:3333/recuperar-senha/${id}
        `
    });
}

module.exports = enviarEmail