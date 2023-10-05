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