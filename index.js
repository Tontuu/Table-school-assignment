const PRIMARY_COLOR = '#009879'
const LABEL = "População total"
const TITLE = "Crescimento populacional no Brasil";
const SUBTITLE = "Dados do IBGE (1872-2022)"

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
      borderColor: PRIMARY_COLOR,
      borderWidth: 4,

      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: PRIMARY_COLOR,
      pointBorderColor: "#fff",
      pointBorderWidth: 1,
      pointHitRadius: 5,
      backgroundColor: "rgba(0, 150, 70, 0.05)",
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

      onClick: (e, items) => {
        if (items) {

          const index = items[0].index;
          const query = ".index-" + index;

          row = document.querySelector(query)

          let activeRows = document.getElementsByClassName('active-row');
          if (activeRows.length > 0) 
            activeRows[0].className = activeRows[0].className.replace('active-row', "");

          row.classList.add('active-row');

          row.scrollIntoView({
            behavior: 'smooth', block: "center"
          })
        }
      },

      plugins: {
        tooltip: {
          yAlign: 'bottom',
          caretPadding: 10,
          caretSize: 5,
          usePointStyle: true,
          titleSpacing: 4,
          footerSpacing: 4,
          footerColor: 'rgb(50, 200, 160)',
          footerFont: {size: 20, weight: '600'},
          footerMarginTop: 8,
          padding: 8,
          boxPadding: 5,
          borderColor: PRIMARY_COLOR,
          borderWidth: 3,
          callbacks: {
            label: titleTooltip,
            footer: (context) => {
              const index = context[0].dataIndex;
              
              if (!index)
                return;

              const content = context[0].dataset.data[index];
              const lastContent = context[0].dataset.data[index-1];

              return "Aumento de " + (content-lastContent) +
                " milhões";
            }
          }
        },

        title: {
          display: true,
          text: TITLE,
          font: {size: 22, weight: '900'},
          color: "rgb(60, 60, 60)",
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
          beginsAtZero: true,
          max: 220,
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


  const tablerow = document.createElement('tr');
  const tabledatah = document.createElement('th');
  const tabledatad = document.createElement('td');
  const tablehead = document.createElement('thead');

  const anoRow = document.createTextNode("Anos");
  const popRow = document.createTextNode("População");

  tablerow.appendChild(tabledatah);
  tablerow.appendChild(tabledatad);
  tablehead.appendChild(tablerow);
  tabledata.appendChild(tablehead);
  tabledatah.appendChild(anoRow);
  tabledatad.appendChild(popRow);


  const tablebody = document.createElement('tbody');
  tabledata.appendChild(tablebody);

  for (i=0; i <  Anos.length; i++) {
    const tablerow = document.createElement('tr');
    const tabledatah = document.createElement('th');
    const tabledatad = document.createElement('td');

    const labelText = document.createTextNode(Anos[i]);
    const dataPoint = document.createTextNode(PopulacaoCompleto[i]);

    tabledatah.appendChild(labelText);
    tabledatad.appendChild(dataPoint);
    tablerow.appendChild(tabledatah);
    tablerow.appendChild(tabledatad);
    tablebody.appendChild(tablerow);

    tablerow.onclick = () => {
      document.querySelector('#myChart').scrollIntoView({
        behavior: 'smooth'
      })
      let activeRows = document.getElementsByClassName('active-row');
      if (activeRows.length > 0) 
        activeRows[0].className = activeRows[0].className.replace('active-row', "");

      tablerow.classList.add('active-row');
    };

    tablerow.classList.add('index-' + i);

    if (i == Anos.length-1) {
      tablerow.classList.add('active-row');
      console.log(tablerow.rowIndex)
    }

  }
}

