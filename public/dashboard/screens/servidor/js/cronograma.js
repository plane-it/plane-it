const dash = document.querySelector("#dash")


new Chart(dash, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
      labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
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