// Sample data for charts
const topProductsData = {
    labels: ['Beans', 'Cowpeas', 'Maize', 'Ground nuts', 'Soybeans'],
    datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
            'rgba(38, 141, 210, 0.5)',
            'rgba(211, 61, 93, 0.5)',
            'rgba(203, 159, 47, 0.5)',
            'rgba(31, 141, 141, 0.5)',
            'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
    }]
  };
  
  const salesOrdersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Purchase Orders',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }, {
        label: 'Sales Orders',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
    }]
  };
  
  // Chart configurations
  const topProductsChart = new Chart(document.getElementById('topProductsChart'), {
    type: 'bar',
    data: topProductsData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
  
  const xValues = ["Beans", "Maize", "Cowpeas", "Ground nuts", "Soybeans"];
  const yValues = [55, 49, 44, 24, 15];
  const barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
  ];
  
  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Sales overview"
      }
    }
  });