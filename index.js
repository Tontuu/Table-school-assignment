const LABEL = "População total"
const TITLE = 'Crescimento populacional no Brasil';
const SUBTITLE = "Dados do IBGE"

d3.csv('atp_wta.csv')
  .then(makeChart);

function makeChart(players) {

  const label = ["oi", "hey", "hi"];
  var Anos = players.map((d) => {return parseFloat(d.Ano)});
  var Populacao = players.map((d) => {return parseFloat(d.População)});
  var PopulacaoCompleto = players.map((d) => {return d.População});

  const data = {
    labels: Anos,
    datasets: [{
      label: LABEL,
      data: Populacao,
      borderColor: 'rgb(155,99,132)',
      borderWidth: 4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: "rgb(155,99,132)",
      pointBorderColor: "#fff",
      pointBorderWidth: 1,
      pointHitRadius: 5,
      backgroundColor: "rgba(155, 99, 100, 0.1)",
      fill: true,
      radius: 5,
      tension: 0.5,
      lineTension: 0,
    }]
  };

  const titleTooltip = (tooltipItems) => {
    const index = tooltipItems.formattedValue + " milhões";

    return "População: " + index;
  }
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: "index",
        intersec: false
      },
      plugins: {
        tooltip: {
          caretPadding: 10,
          caretSize: 5,
          usePointStyle: true,
          titleSpacing: 4,
          footerSpacing: 8,
          padding: 8,
          boxPadding: 5,
          borderColor: 'rgb(155,99,100)',
          borderWidth: 3,
          callbacks: {
            label: titleTooltip
          }
        },

        title: {
          display: true,
          text: TITLE,
          font: {size: 22},
          color: "rgb(60, 60, 60)"
        },
        subtitle: {
          display: true,
          text: SUBTITLE,
          padding: 5,
          position: "right",
          color: "rgb(150,150,150)"
        },
        legend: {
          display: true,
        }
      },
      scales: {
        y: {
          max: 255,
          ticks: {
            stepSize: 10,
            // Include m sign
            callback: (value, index, ticks) => {
              if (index == 0) { return "1 milhão" }
              return value + " milhões";
            },
          },
        },
      },
    },
  };

  Chart.defaults.font.size = 20;
  Chart.defaults.font.family = 'Arial';



  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  const tabledatar = document.createElement('tr');
  const tabledatah = document.createElement('th');
  const tabledatad = document.createElement('td');

  const anoRow = document.createTextNode("Anos");
  const popRow = document.createTextNode("População");

  tabledatah.appendChild(anoRow);
  tabledatad.appendChild(popRow);
  tabledata.appendChild(tabledatar);
  tabledatar.appendChild(tabledatah);
  tabledatar.appendChild(tabledatad);

  for (i=0; i <  Anos.length; i++) {
    const tabledatar = document.createElement('tr');
    const tabledatah = document.createElement('th');
    const tabledatad = document.createElement('td');

    const labelText = document.createTextNode(Anos[i]);
    const dataPoint = document.createTextNode(PopulacaoCompleto[i]);

    tabledatah.appendChild(labelText);
    tabledatad.appendChild(dataPoint);

    tabledata.appendChild(tabledatar);
    tabledatar.appendChild(tabledatah);
    tabledatar.appendChild(tabledatad);
  }
}

