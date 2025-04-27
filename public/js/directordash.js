// Simulate user authentication (replace with actual authentication)
const loggedInUser = "Mr. Orban"; // Only Mr. Orban can see the dashboard

if (loggedInUser === "Mr. Orban") {
    const salesData = {
        "Matttuga": [1000, 1200, 1500, 1100, 1300],
       
        "Maganjo": [700, 750, 800, 720, 780]
    };

    function calculateSales() {
        let totalSales = 0;
        let allSales = [];
        let branchTotals = {};

        for (const branch in salesData) {
            const branchSales = salesData[branch];
            const branchTotal = branchSales.reduce((acc, val) => acc + val, 0);
            totalSales += branchTotal;
            allSales = allSales.concat(branchSales);
            branchTotals[branch] = branchTotal;
        }

        const averageDailySales = totalSales / allSales.length;

        let highestBranch = { name: "", sales: -Infinity };
        let lowestBranch = { name: "", sales: Infinity };

        for (const branch in branchTotals) {
            if (branchTotals[branch] > highestBranch.sales) {
                highestBranch.sales = branchTotals[branch];
                highestBranch.name = branch;
            }
            if (branchTotals[branch] < lowestBranch.sales) {
                lowestBranch.sales = branchTotals[branch];
                lowestBranch.name = branch;
            }
        }

        document.getElementById("totalSales").textContent = `$${totalSales.toFixed(2)}`;
        document.getElementById("averageDailySales").textContent = `$${averageDailySales.toFixed(2)}`;
        document.getElementById("highestBranchSales").textContent = `$${highestBranch.sales.toFixed(2)}`;
        document.getElementById("highestBranchName").textContent = highestBranch.name;
        document.getElementById("lowestBranchSales").textContent = `$${lowestBranch.sales.toFixed(2)}`;
        document.getElementById("lowestBranchName").textContent = lowestBranch.name;

        // Populate the table
        populateTable(branchTotals);
    }

    function populateTable(branchTotals) {
        const tableBody = document.getElementById("salesTableBody");
        tableBody.innerHTML = ""; // Clear existing rows
        let tableTotal = 0;

        for (const branch in branchTotals) {
            const row = tableBody.insertRow();
            const branchCell = row.insertCell();
            const salesCell = row.insertCell();
            const periodCell = row.insertCell();

            branchCell.textContent = branch;
            salesCell.textContent = `$${branchTotals[branch].toFixed(2)}`;
            periodCell.textContent = "March 2025";

            tableTotal += branchTotals[branch];
        }

        document.getElementById("tableTotalSales").textContent = `$${tableTotal.toFixed(2)}`;
    }

    calculateSales();
} else {
    // Redirect or show an error message if the user is not authorized
    document.body.innerHTML = "<h1>Access Denied</h1><p>You are not authorized to view this page.</p>";
}
