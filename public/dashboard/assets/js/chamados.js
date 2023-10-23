function loadChamados(){
    fetch(`/empresa/chamados/${1}`)
        .then(res => res.json())
        .then(res => {
            res.map(i => {
                const formattedDate = new Date(i.datahora).toLocaleString()
                chamados.innerHTML +=`
                    <div class="alert-called">
                    <div class="alert-called-header">
                        <p class="col-4">${i.estado}</p>
                        <p class="col-4">${i.nivel}</p>
                        <p class="col-4">${i.sla}</p>
                        </div>
                    <div class="alert alert-light-gray alert-flex-col" data-notify="container">
                        <div class="d-flex row">
                        <div class="col-12 col-md-9 d-flex justify-content-md-start justify-content-center align-items-center gap-1">
                            <span class="nc-icon nc-bell-55"></span>
                            <span>${i.apelido}</span>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-center top-sm-1">
                            <span>${formattedDate}</span>
                        </div>
                        </div>
                        <div class="d-flex gap-2">
                        <div class="card-metric">
                            <p>Cpu</p>
                            <p>${i.cpu}</p>
                        </div>
                        <div class="card-metric">
                            <p>Disco</p>
                            <p>${i.disco}%</p>
                        </div>
                        <div class="card-metric">
                            <p>Ram</p>
                            <p>${i.ram}%</p>
                        </div>
                        </div>
                    </div>
                    </div>
                `
            })
        })
}

document.addEventListener("DOMContentLoaded", (e) => {
    loadChamados()
})