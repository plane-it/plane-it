demo = {
  initPickColor: function () {
    $(".pick-class-label").click(function () {
      var new_class = $(this).attr("new-class");
      var old_class = $("#display-buttons").attr("data-class");
      var display_div = $("#display-buttons");
      if (display_div.length) {
        var display_buttons = display_div.find(".btn");
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr("data-class", new_class);
      }
    });
  },

  initChartsPages: function () {
    chartColor = "#FFFFFF";

    ctx = document.getElementById("analiseRAM").getContext("2d");

    myChart = new Chart(ctx, {
      type: "line",

      data: {
        labels: [
          "12:00",
          "12:05",
          "12:10",
          "12:15",
          "12:20",
          "12:25",
          "12:30",
          "12:35",
          "12:40",
          "12:45",
          "12:50",
          "12:55",
          "13:00",
        ],
        datasets: [
          {
            label: "Utilização da memória RAM ",
            borderColor: "#3A7D44",
            backgroundColor: "transparent",
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBorderWidth: 8,
            // borderWidth: 0.1,
            data: [98,97,97,98,99,92,89,99,97,98,95,98,97],
          },
        ],
      },
      options: {
        legend: {
          display: false,
          position: "top",
        },

        /*  tooltips: {
            enabled: false
          }, */

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f",
              },
            },
          ],
        },
      },
    });

    ctx = document.getElementById("chartUtiRAM").getContext("2d");

    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Utilizado", "Não utilizado"],
        datasets: [
          {
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#69b5789e", "#3A7D44"],
            borderWidth: 0,
            data: [11.3, 42.2],
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2,
        },

        /* tooltips: {
            enabled: false
          }, */

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "69B578",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: true,
                color: "69B578",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: true,
              },
            },
          ],
        },
      },
    });


    ctx = document.getElementById("chartUtilizado").getContext("2d");

    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "12:00",
          "12:05",
          "12:10",
          "12:15",
          "12:20",
          "12:25",
          "12:30",
          "12:35",
          "12:40",
          "12:45",
          "12:50",
          "12:55",
          "13:00",
        ],
        datasets: [
          {
           label: "Memória usada",
           backgroundColor: "#3A7D44",
           tension: 0.1,
           // borderWidth: 0.1,
           data: [38.9,38.7,42.9,49.2,32.6,40.1,41.6,39.7,38.8,40.5,41,39.1,42.6],
          },
          {
            label: "Memória disponível",
            backgroundColor: "#8b0000",
            tension: 0.1,
            // borderWidth: 0.1,
            data: [50.0,49.1,49.8,49.2,49.6,46.1,48,49.7,48.8,50.5,51,49.1,48.6],
          }

        ],
      },

      options: {
        legend: {
          display: true,
        },
        /* tooltips: {
            enabled: false
          }, */

        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: "transparent",
                // color: "69B578",
              },
            },
          ],

          xAxes: [
            {
              // barPercentage: 1.6,
              gridLines: {
                drawBorder: true,
                // color: "69B578",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: true,
              },
            },
          ],
        },
      },
    });
  },
};
