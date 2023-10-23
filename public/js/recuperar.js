function recuperarSenha(){
    const cpf = document.getElementById("iptCpf")
    
    if(cpf.value.length != 11){
        Swal.fire("ERRO","Preencha todas as infomações","error")
    }
    else{
        fetch(`/usuarios/recuperar/${cpf.value}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.error){
                throw new error(error)
            }
            else{
                const emailStart = res.email.substr(0,1)
                const findMiddle = res.email.indexOf("@")
                const emailEnd = res.email.substr(findMiddle, res.email.length)
                Swal.fire("Sucesso", "O email foi enviado para o email "+emailStart+ "****" +emailEnd)
            }
        })
        .catch()
    }
}

function alterarSenha(){
    const senha = document.getElementById("iptSenha").value
    const confimarSenha = document.getElementById("iptConfirmarSenha").value
    const splitedUrl = window.location.href.split("/")
    const id = splitedUrl[splitedUrl.length-1]

    if(senha != confimarSenha || !senha || !confimarSenha){
        Swal.fire("ERRO", "Verifique os campos", "error")
    }
    else{
        fetch(`/usuarios/alterar-senha/${id}`,{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                senha: senha
            })
        })
        .then(res => {
            if(res.status == 200){
                Swal.fire("Sucesso","Senha Alterada","sucess")
                setTimeout(() => {
                    window.location.href = "/login.html"
                },1000)
            }
        })
    }
}