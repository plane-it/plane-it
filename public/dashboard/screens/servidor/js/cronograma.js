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

const data = [12, 19, 3, 5, 2, 3, 8, 10, 15, 20, 25, 30, 35, 40, 35, 32, 36, 38, 40, 42, 45, 50, 55, 60, 65, 70, 75, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0, 2, 4, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 35, 30, 25, 20, 15, 10, 5, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

const dashHistory = new Chart(dashHist, {
    type: 'line',
    data: {
    labels: ['10:30','10:40','10:50','11:00','11:10','11:20','11:30','11:40','11:50','12:00','12:10','12:20', '12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50', '17:00', '17:10', '17:20', '17:30', '17:40', '17:50', '18:00', '18:10', '18:20', '18:30', '18:40', '18:50', '19:00', '19:10', '19:20', '19:30', '19:40', '19:50', '20:00', '20:10', '20:20', '20:30', '20:40', '20:50', '21:00', '21:10', '21:20', '21:30', '21:40', '21:50', '22:00', '22:10', '22:20', '22:30', '22:40', '22:50', '23:00', '23:10', '23:20', '23:30', '23:40', '23:50', '00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30', '04:40', '04:50', '05:00', '05:10', '05:20', '05:30', '05:40', '05:50', '06:00',],
      datasets: [{
        label: '# of Votes',
        data: data,
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
          max: Math.max(...data)+10, 
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      },
    },
})

const ocoupiedSpace = data.length/16
const barsize = scrollbar.offsetWidth / ocoupiedSpace
bar.style.width = barsize+"px"

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
    const value = data.filter((item) => item.days == index+1).map((item) => item.avgValues)[0] || 0
    const roundedValue = Math.round(value)
    return roundedValue
  })
  
  dashWeekly.data.datasets[0].data = orderedData
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

  cpu.innerText = dataDaily.filter((item) => item.type == 1)[0].value
  ram.innerText = dataDaily.filter((item) => item.type == 2)[0].value
  disk.innerText = dataDaily.filter((item) => item.type == 3)[0].value
}
getDaily("2023-11-06")