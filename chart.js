// Create an array of data for the chart
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Example Data',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [15, 20, 40, 20, 25, 60, 15],
      },
    ],
  };
  
  // Set the chart options
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
  // Create a new canvas element and set its attributes
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  
  // Add the canvas element to a div in the HTML
  const chartDiv = document.getElementById('chart-div');
  chartDiv.appendChild(canvas);
  
  // Create a new line chart using the canvas element
  const ctx = canvas.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
  });