function loadAlertas(){
    console.log(alertas)
    fetch("/alertas/listar/1",{
        method: "GET" 
    })
        .then(res => res.json())
        .then(res => {
            res.alertas.map(i => {
                alertas.innerHTML  += `
                <div class="alert alert-light-gray alert-with-icon alert-flex-col alert-dismissible fade show" data-notify="container">
                    <div class="d-flex row">
                        <div class="col-12 col-md-9 d-flex justify-content-md-start justify-content-center align-items-center gap-1">
                            <span class="nc-icon nc-bell-55"></span>
                            <span>${i.servidor}</span>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-center top-sm-1">
                        <span>${i.datahora}</span>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="card-metric">
                        <p>Cpu</p>
                        <p>${i.cpu}%</p>
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
                `
            })
        })
}

loadAlertas()