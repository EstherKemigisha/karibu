let salesData = [];

document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const product = document.getElementById('product').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const date = document.getElementById('date').value;

    if (!product || isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0 || !date) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    const total = quantity * price;

    salesData.push({product, quantity, price, total, date});
    updateDashboard();
    updateTable();

    document.getElementById('salesForm').reset();
});

function updateDashboard() {
    let totalSales = 0;
    let todaysSales = 0;
    let totalItemsSold = 0;
    const today = new Date().toISOString().split('T')[0];

    salesData.forEach(sale => {
        totalSales += sale.total;
        totalItemsSold += sale.quantity;
        if (sale.date === today) {
            todaysSales += sale.total;
        }
    });

    const averageSale = salesData.length > 0 ? totalSales / salesData.length : 0;

    document.getElementById('totalSales').textContent = totalSales.toFixed(2);
    document.getElementById('todaysSales').textContent = todaysSales.toFixed(2);
    document.getElementById('averageSale').textContent = averageSale.toFixed(2);
    document.getElementById('totalItemsSold').textContent = totalItemsSold;
}

function updateTable() {
    const table = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    salesData.forEach(sale => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = sale.product;
        newRow.insertCell(1).textContent = sale.quantity;
        newRow.insertCell(2).textContent = sale.price.toFixed(2);
        newRow.insertCell(3).textContent = sale.total.toFixed(2);
        newRow.insertCell(4).textContent = sale.date;
    });
}

const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart", {
  type: "doughnut",
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
      text: "World Wide Wine Production 2018"
    }
  }
});