const dash = document.querySelector("#dash")
const dashHist = document.querySelector("#dashHist")
const scrollbar = document.querySelector("#scrollbar")
const bar = document.querySelector("#bar")
const timeline = document.querySelector("#timelineDate")

let yesterday = new Date()
yesterday.setDate(new Date().getDate()-2)
timeline.max = yesterday.toISOString().split("T")[0]
timeline.value = yesterday.toISOString().split("T")[0]

new Chart(dash, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
      labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
      labels: ['10:30','10:40','10:50','11:00','11:10','11:20','11:30','11:40','11:50','12:00','12:10','12:20', '12:30', '12:40', '12:50', '13:00', '13:10'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 8, 10, 15, 20, 25, 30, 35, 40, 35, 32, 36],
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
  const datasize = dashHistory.data.datasets[0].data.length
  const ScrollbarSize = scrollbar.offsetWidth

  const position = Math.ceil(newMin/(datasize-16)*100)
  console.log(position)
  const pos = Math.ceil(ScrollbarSize * (position/100))
  const res = position == 100 ? pos-30+"px" : pos+"px"
  console.log(res)
  bar.style.marginLeft = res
}