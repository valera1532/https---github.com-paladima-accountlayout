var ctx = document.getElementById('myChart').getContext('2d');

var dayData = [
  { x: '00:00', y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: '01:00', y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: '02:00', y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 }
];

var monthData = [
  { x: 1, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 2, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 3, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 4, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 5, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 7, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 8, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 9, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 10, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 11, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 12, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 13, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 14, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 15, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 16, y: 400 },
  { x: 17, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 18, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 19, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 20, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 21, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 22, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 23, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 24, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 25, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 26, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 27, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 28, y: 1000 },
  { x: 29, y: 0 },
  { x: 30, y: 0 }
];

var yearData = [
  { x: 2020, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 2021, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 2022, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 },
  { x: 2023, y: Math.floor(Math.random() * (140 - 20 + 1)) + 20 }
];
var chartTypeSelect = document.getElementById('chartType');

var defaultGradient = ctx.createLinearGradient(0, 0, 0, 400);
defaultGradient.addColorStop(0, '#EFF1FF');
defaultGradient.addColorStop(1, '#EFF1FF');

var hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
hoverGradient.addColorStop(0, '#748EED');
hoverGradient.addColorStop(1, '#748EED');

var currentGradient = defaultGradient;

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: monthData.map(data => data.x),
    datasets: [{
      label: '',
      data: monthData,
      backgroundColor: defaultGradient,
      borderColor: '#000000',
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      },
      onHover: {
        mode: 'index',
        intersect: true
      }
    },
    scales: {
      x: {
        ticks: {
          display: true,
          font: {
            size: 12
          }
        }
      },
      y: {
        ticks: {
          display: true,
          font: {
            size: 12
          },
          stepSize: 20
        }
      }
    },
    indexAxis: 'x',
    elements: {
      bar: {
        borderRadius: 10
      }
    },
  },
});

chartTypeSelect.addEventListener('change', function() {
  var selectedType = chartTypeSelect.value;

  if (selectedType === 'day') {
    myChart.data.datasets[0].data = dayData;
    myChart.data.labels = dayData.map(data => data.x);
    currentGradient = defaultGradient;
  } else if (selectedType === 'month') {
    myChart.data.datasets[0].data = monthData;
    myChart.data.labels = monthData.map(data => data.x);
    currentGradient = defaultGradient;
  } else if (selectedType === 'year') {
    myChart.data.datasets[0].data = yearData;
    myChart.data.labels = yearData.map(data => data.x);
    currentGradient = defaultGradient;
  }

  myChart.data.datasets[0].backgroundColor = currentGradient;
  myChart.update();
});

myChart.options.interaction.mode = 'index';
myChart.options.interaction.intersect = false;

myChart.config.options.onHover = function (event, elements) {
  if (elements && elements.length > 0) {
    var hoveredElement = elements[0];
    var datasetIndex = hoveredElement.datasetIndex;
    var meta = this.getDatasetMeta(datasetIndex);
    var dataset = this.data.datasets[datasetIndex];
    var elements = meta.data;

    elements.forEach(function (element) {
      if (!element.custom) {
        element.custom = {};
        element.custom.backgroundColor = element.options.backgroundColor;
      }

      element.options.backgroundColor = element === hoveredElement.element ? hoverGradient : defaultGradient;
    });

    dataset.backgroundColor = elements.map(function (element) {
      return element.options.backgroundColor;
    });
  }

  this.update();
};

myChart.config.options.onLeave = function (event, elements) {
  if (elements && elements.length > 0) {
    var datasetIndex = elements[0].datasetIndex;
    var meta = this.getDatasetMeta(datasetIndex);
    var dataset = this.data.datasets[datasetIndex];
    var elements = meta.data;

    elements.forEach(function (element) {
      element.options.backgroundColor = element.custom ? element.custom.backgroundColor : defaultGradient;
    });

    dataset.backgroundColor = elements.map(function (element) {
      return element.options.backgroundColor;
    });
  }

  this.update();
};