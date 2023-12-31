const dash = document.querySelector("#dash")
const dashHist = document.querySelector("#dashHist")
const bar = document.querySelector("#bar")
const timeline = document.querySelector("#timelineDate")
const component = document.querySelector("#component")
const noData = document.querySelector("#noData")

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
        pointRadius: 5,
        hoverRadius: 10,
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

bar.addEventListener("input",(e) => {
  const step = 100 / (dashHistory.data.datasets[0].data.length - 16)
  const position = Math.round(e.target.value / step)

  dashHistory.options.scales.x.min = position
  dashHistory.options.scales.x.max = position + 15
  dashHistory.update()
})

function scrollBar(){
  const newMin = dashHistory.options.scales.x.min

  const step = 100 / (dashHistory.data.datasets[0].data.length - 16)
  const currentStep = step*newMin

  bar.value = currentStep
}

async function getWeekly(tipoComponente){
  const metric = document.querySelector("#metric")
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
    if(data[0].metrica < item.avgValues){
      return "#dc3545"
    }
    else if(data[0].metrica * 0.9 < item.avgValues){
      return "#ffc107"
    }
    else{
      return "#28a745"
    }
  })

  const values = orderedData.map((item) => {
    if(!item) return 0
    return Math.round(item.avgValues * 10) / 10
  })

  metric.innerText = data[0] ? `${data[0].uniName} - ${data[0].uni}` : ""

  dashWeekly.data.datasets[0].data = values
  dashWeekly.data.datasets[0].backgroundColor = colors
  dashWeekly.data.datasets[0].label = data[0] ? data[0].uniName : ""
  dashWeekly.update()

  getKpi(data[0].metrica, data[0].uni)
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
    dataDaily.map((item) => {
      if(item.type == 1){
        cpu.innerText = item.value.toFixed(1)+item.uni
      }
      else if(item.type == 2){
        ram.innerText = item.value.toFixed(1)+item.uni
      }
      else if(item.type == 3){
        disk.innerText = item.value.toFixed(1)+item.uni
      }
    })
  }
}
getDaily(timeline.value)

async function getHistory(type, date){ 
  const serverId = sessionStorage.ID_SERVIDOR_ESCOLHIDO

  const res = await fetch("/cronograma/valores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServidor: serverId,
      data: date,
      type: type,
    })
  })

  const data = await res.json()

  const orderedData = data.map((item) => item.value)
  const orderedLabels = data.map((item) => item.hour + ":" + String(item.minute).padStart(2, "0"))

  if(data.length == 0){
    dashHist.style.display = "none"
    bar.style.display = "none"
    noData.style.display = "flex"
  }
  else{
    dashHist.style.display = "block"
    bar.style.display = "block"
    noData.style.display = "none"
  }
  if(data.length == 1){
    if(data[0].hour == 23 && data[0].minute == 55){
      orderedData.shift(0)
      orderedLabels.shift("23:50")
    }
    else{
      let lastHour = data[0].hour
      let lastMinute = data[0].minute + 5

      if(lastMinute == 60){
        lastHour = lastHour + 1
        lastMinute = 0
      }

      orderedData.push(0)
      orderedLabels.push(lastHour + ":" + String(lastMinute).padStart(2, "0"))
    } 
  }
  else{
    let totalAdded = 0
    orderedLabels.forEach((_, index) => {
      if(
        index != data.length-1 &&
        (
          (data[index].hour != data[index+1].hour &&  data[index+1].minute == 0) ^
          data[index].minute != data[index+1].minute - 5
        )
      ){
        const toAddValue = []
        let minute = data[index].minute + 5
        let hour = data[index].hour

        while(minute != data[index+1].minute || hour != data[index+1].hour){
          if(minute == 60){
            minute = 0
            hour = hour + 1
          }
          toAddValue.push(hour + ":" + String(minute).padStart(2, "0"))
          minute = minute + 5
        }
        orderedLabels.splice(index+1+totalAdded, 0, ...toAddValue)
        orderedData.splice(index+1+totalAdded, 0, ...toAddValue.map(() => 0))
        totalAdded = totalAdded + toAddValue.length
      }
    })
  }
  handleScrollSize(orderedData.length)

  const colors = orderedData.map((item) => {
    if(data[0].metrica < item){
      return "#dc3545"
    }
    else if(data[0].metrica * 0.9 < item){
      return "#ffc107"
    }
    else{
      return "#28a745"
    }
  })

  dashHistory.options.scales.y.max = Math.round(Math.max(...orderedData)*1.1)
  dashHistory.update()

  dashHistory.data.datasets[0].data = orderedData
  dashHistory.data.datasets[0].label = data[0] ? data[0].uniName : ""
  dashHistory.data.datasets[0].backgroundColor = colors
  dashHistory.data.labels = orderedLabels
  dashHistory.update()
}
getHistory(1, timeline.value)

function getKpi(value, uni){
  const saudavel = document.querySelector("#saudavel")
  const alerta = document.querySelector("#alerta")
  const risco = document.querySelector("#risco")

  const floatValue = Number(value)

  saudavel.innerText = `Menores igual que ${(floatValue*0.9).toFixed(1)}${uni}`
  alerta.innerText = `Maiores que ${(floatValue*0.9).toFixed(1)}${uni}`
  risco.innerText = `Maiores que ${(floatValue).toFixed(1)}${uni}`
}

function handleScrollSize(size){
    dashHistory.options.scales.x.max = 15
    dashHistory.options.scales.x.min = 0
    scrollBar()
    if(size == 0){
      bar.style.setProperty("--scrollbar", "100%")
      return
    }
    const ocoupiedSpace = (16/size) * 100

    const barsize = ocoupiedSpace > 100
      ? 100
      : ocoupiedSpace

    bar.style.setProperty("--scrollbar", barsize+"%")
}

async function getHolidays(){
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const data = await fetch("/cronograma/feriados")
  const res = await data.json()
  const today = new Date()
 
  for(let i = 0; i < res.length; i++){
    if(
      res[i].mes > today.getMonth()+1 ||
      (
       res[i].mes == today.getMonth()+1 &&
        Number(res[i].dia) >= today.getDate()
      ) ||
      (
        Number(res[res.length-1].dia) < today.getDate() &&
        today.getMonth()+1 == 12
      )
    ){
      const holiday = document.querySelector("#holiday")
      const holidayName = document.querySelector("#holidayName")
      const holidayMonthYear = document.querySelector("#holidayMonthYear")

      const year = 
        Number(res[res.length-1].dia) < today.getDate() &&
        today.getMonth()+1 == 12
        ? today.getFullYear()+1
        : today.getFullYear()

      holidayName.innerText = res[i].titulo
      holidayMonthYear.innerText = year + " - " + months[Number(res[i].mes)-1]
      holiday.innerText = res[i].dia
      break
    }
  }
}
getHolidays()

function updateTimeline(date){
  getDaily(date)
  getHistory(component.value, date)
}

function updateComponent(type){
  getWeekly(type)
  getHistory(type, timeline.value)
}