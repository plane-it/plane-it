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
        backgroundColor: ['#dc3545','#ffc107', '#28a745'],
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
    console.log(item)
    if(item.metrica > item.avgValues){
      return "#28a745"
    }
    else if(item.metrica > item.avgValues * 0.9){
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
  console.log(data)

  if(data.length == 0){
    dashHistory.data.datasets[0].data = []
    dashHistory.update()
  }
  else{
    const orderedData = data.map((item) => item.value)
    const orderLabels = data.map((item) => item.hour + ":" + item.minute)
    dashHistory.data.datasets[0].data = orderedData
    dashHistory.options.scales.x.max = Math.max(orderedData)
    dashHistory.data.labels = [...orderLabels, "20:10"]
    dashHistory.update()

  }
}
getHistory("2023-11-06")