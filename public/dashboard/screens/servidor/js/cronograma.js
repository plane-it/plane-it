const dash = document.querySelector("#dash")
const dashHist = document.querySelector("#dashHist")
const scrollbar = document.querySelector("#scrollbar")
const bar = document.querySelector("#bar")
const timeline = document.querySelector("#timelineDate")

let yesterday = new Date()
yesterday.setDate(new Date().getDate()-2)
timeline.max = yesterday.toISOString().split("T")[0]
timeline.value = yesterday.toISOString().split("T")[0]

const dashWeekly = new Chart(dash, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
      labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: ['','', ''],
        borderRadius: 10,
        borderSkipped: false,
        barPercentage: 0.5,
      }]
    },
    options: {
      grid:{
        display: false,
      },
      scales: {
        x: {
          position: 'top',
          grid: {
            display: false,
          },
       },
        y: {
          display: false,
          beginAtZero: true,
          grid: {
            display: false,
          },
        }
      },
      plugins: {
        datalabels: {
          color: "#fff",
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        legend: {
          display: false,
        }
      },
    },
})


const dashHistory = new Chart(dashHist, {
    type: 'line',
    data: {
    labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: ['#dc3545','#ffc107', '#28a745'],
      }]
    },
    options: {
      grid:{
        display: false,
      },
      scales: {
        x: {
          position: 'top',
          max: 15,
          min: 0
       },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      },
    },
})


dashHist.addEventListener("wheel", (e) => {
  e.preventDefault()
  const datasize = dashHistory.data.datasets[0].data.length

  const currentMax = dashHistory.options.scales.x.max
  const currentMin = dashHistory.options.scales.x.min

  if(e.deltaY > 0 && currentMax < datasize -1){
    dashHistory.options.scales.x.max = currentMax+1
    dashHistory.options.scales.x.min = currentMin+1
  }
  else if(currentMin > 0 && e.deltaY < 0){
    dashHistory.options.scales.x.max = currentMax-1
    dashHistory.options.scales.x.min = currentMin-1
  }
  dashHistory.update()
  scrollBar()
})

function scrollBar(){
  const newMin = dashHistory.options.scales.x.min
  const nonOcoupiedSpace = scrollbar.offsetWidth - barsize
  const scrollStepSize = nonOcoupiedSpace / (data.length-16)

  bar.style.marginLeft = scrollStepSize * newMin + "px"
}

async function getWeekly(tipoComponente){
  const serverId = sessionStorage.ID_SERVIDOR_ESCOLHIDO

  const res = await fetch("/cronograma/medidaSemanal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServidor: serverId,
      tipoComponente: tipoComponente,
    })
  })

  const data = await res.json()

  const orderedData = dashWeekly.data.labels.map((item, index) => {
    const newData = data.filter((item) => item.days == index+1)
    return newData[0]
  })

  const colors = orderedData.map((item) => {
    if(!item) return ""
    if(data[0].metrica > item.avgValues){
      return "#28a745"
    }
    else if(data[0].metrica > item.avgValues * 0.9){
      return "#ffc107"
    }
    else{
      return "#dc3545"
    }
  })

  const values = orderedData.map((item) => {
    if(!item) return 0
    return Math.round(item.avgValues * 10) / 10
  })

  dashWeekly.data.datasets[0].data = values
  dashWeekly.data.datasets[0].backgroundColor = colors
  dashWeekly.update()

  getKpi(data[0].avgValues, data[0].uni)
}
getWeekly(1)

async function getDaily(date){
  const cpu = document.querySelector("#cpuDaily")
  const ram = document.querySelector("#ramDaily")
  const disk = document.querySelector("#diskDaily")

  const serverId = sessionStorage.ID_SERVIDOR_ESCOLHIDO

  const res = await fetch("/cronograma/mediaDiaria", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServidor: serverId,
      data: date,
    })
  })

  const dataDaily = await res.json()

  cpu.innerText = ""
  ram.innerText = ""
  disk.innerText = ""

  if(dataDaily.length > 0){
    console.log(dataDaily)
    dataDaily.map((item) => {
      if(item.type == 1){
        cpu.innerText = item.value+item.uni
      }
      else if(item.type == 2){
        ram.innerText = item.value+item.uni
      }
      else if(item.type == 3){
        disk.innerText = item.value+item.uni
      }
    })
  }
}
getDaily(timeline.value)

async function getHistory(date){
  const serverId = sessionStorage.ID_SERVIDOR_ESCOLHIDO

  const res = await fetch("/cronograma/valores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServidor: serverId,
      data: date,
      type: 1,
    })
  })

  const data = await res.json()

  if(data.length == 0){
    dashHistory.data.datasets[0].data = []
    dashHistory.update()
    handleScrollSize(0)
  }
  else{
    const orderedData = data.map((item) => item.value)
    const orderLabels = data.map((item) => item.hour + ":" + item.minute)
    dashHistory.data.datasets[0].data = orderedData
    dashHistory.options.scales.x.max = Math.max(orderedData)
    dashHistory.data.labels = [...orderLabels, "20:10"]
    dashHistory.update()
    handleScrollSize(orderedData.length)
  }
}
getHistory(timeline.value)

function getKpi(value, uni){
  const saudavel = document.querySelector("#saudavel")
  const alerta = document.querySelector("#alerta")
  const risco = document.querySelector("#risco")

  saudavel.innerText = `Menores que ${(value*0.8).toFixed(1)}${uni}`
  alerta.innerText = `Maiores que ${(value*0.9).toFixed(1)}${uni}`
  risco.innerText = `Maiores que ${(value).toFixed(1)}${uni}`
}

function handleScrollSize(size){
    if(size == 0){
      bar.style.width = "100%"
      return
    }
    const ocoupiedSpace = (16/size) * 100

    const barsize = ocoupiedSpace > 100
      ? 100
      : ocoupiedSpace

    bar.style.width = barsize+"%"
}

function updateTimeline(date){
  getDaily(date)
  getHistory()
}