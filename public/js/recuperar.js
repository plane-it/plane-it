function recuperarSenha(){
    const cpf = document.getElementById("iptCpf")
    
    if(cpf.value.length != 14){
        Swal.fire("ERRO","Preencha todas as infomações","error")
    }
    else{
        fetch(`/usuarios/recuperar/${cpf.value}`)
        .then(res => {

        })
    }
}