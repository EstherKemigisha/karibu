document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("salesRecordForm");

  // Helper Functions
  function showError(input, message) {
    input.classList.add("error");
    let error = input.parentElement.querySelector(".error-message");
    if (!error) {
      error = document.createElement("span");
      error.classList.add("error-message");
      input.parentElement.appendChild(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("error");
    const error = input.parentElement.querySelector(".error-message");
    if (error) {
      error.textContent = "";
    }
  }

  // Field Validation Functions
  function validateProduceNameField() {
    const produceNameField = document.getElementById("produceName");
    if (produceNameField.value === "") {
      showError(produceNameField, "Please select a valid produce.");
    } else {
      clearError(produceNameField);
    }
  }

  function validateTonnageField() {
    const tonnageField = document.getElementById("tonnage");
    const maxTonnage = parseFloat(tonnageField.getAttribute("max"));
    const value = parseFloat(tonnageField.value);

    if (isNaN(value) || value <= 0 || value > maxTonnage) {
      showError(tonnageField, `Please enter a valid tonnage (1-${maxTonnage} kgs).`);
    } else {
      clearError(tonnageField);
    }
  }

  function validatePricePerKgField() {
    const pricePerKgField = document.getElementById("pricePerkg");
    const value = parseFloat(pricePerKgField.value);

    if (isNaN(value) || value <= 0) {
      showError(pricePerKgField, "Please enter a valid price per kg.");
    } else {
      clearError(pricePerKgField);
    }
  }

  function validateAmountPaidField() {
    const amountPaidField = document.getElementById("amountPaid");
    const value = parseFloat(amountPaidField.value);

    if (isNaN(value) || value <= 0) {
      showError(amountPaidField, "Please enter a valid amount paid.");
    } else {
      clearError(amountPaidField);
    }
  }

  function validateQuantitySoldField() {
    const quantitySoldField = document.getElementById("quantitysold");
    const value = parseFloat(quantitySoldField.value);

    if (isNaN(value) || value <= 0) {
      showError(quantitySoldField, "Please enter a valid quantity sold.");
    } else {
      clearError(quantitySoldField);
    }
  }

  function validateTotalAmountField() {
    const totalAmountField = document.getElementById("totalamount");
    const value = parseFloat(totalAmountField.value);

    if (isNaN(value) || value <= 0) {
      showError(totalAmountField, "Please enter a valid total amount.");
    } else {
      clearError(totalAmountField);
    }
  }

  function validateBranchField() {
    const branchField = document.getElementById("branch");
    if (branchField.value === "") {
      showError(branchField, "Please select a branch.");
    } else {
      clearError(branchField);
    }
  }

  function validateBuyerNameField() {
    const buyerNameField = document.getElementById("buyerName");
    if (!buyerNameField.value.trim()) {
      showError(buyerNameField, "Please enter the buyer's name.");
    } else {
      clearError(buyerNameField);
    }
  }

  function validateSalesAgentField() {
    const salesAgentField = document.getElementById("salesAgent");
    if (salesAgentField.value === "") {
      showError(salesAgentField, "Please select a sales agent.");
    } else {
      clearError(salesAgentField);
    }
  }

  function validateDateTimeField() {
    const dateTimeField = document.getElementById("dateTime");
    if (!dateTimeField.value) {
      showError(dateTimeField, "Please select a valid date and time.");
    } else {
      clearError(dateTimeField);
    }
  }

  // Event Listeners for Validation
  document.getElementById("produceName").addEventListener("blur", validateProduceNameField);
  document.getElementById("tonnage").addEventListener("blur", validateTonnageField);
  document.getElementById("pricePerkg").addEventListener("blur", validatePricePerKgField);
  document.getElementById("amountPaid").addEventListener("blur", validateAmountPaidField);
  document.getElementById("quantitysold").addEventListener("blur", validateQuantitySoldField);
  document.getElementById("totalamount").addEventListener("blur", validateTotalAmountField);
  document.getElementById("branch").addEventListener("blur", validateBranchField);
  document.getElementById("buyerName").addEventListener("blur", validateBuyerNameField);
  document.getElementById("salesAgent").addEventListener("blur", validateSalesAgentField);
  document.getElementById("dateTime").addEventListener("blur", validateDateTimeField);

  // Form Submission Validation
  form.addEventListener("submit", (event) => {
    validateProduceNameField();
    validateTonnageField();
    validatePricePerKgField();
    validateAmountPaidField();
    validateQuantitySoldField();
    validateTotalAmountField();
    validateBranchField();
    validateBuyerNameField();
    validateSalesAgentField();
    validateDateTimeField();

    // Prevent form submission if there are errors
    const errors = form.querySelectorAll(".error");
    if (errors.length > 0) {
      event.preventDefault();
    }
  });
});


// sales calculations
// public/js/sales.js
document.addEventListener('DOMContentLoaded', () => {
    const tonnageInput = document.getElementById('tonnage');
    const priceInput = document.getElementById('pricePerkg');
    const totalInput = document.getElementById('totalamount');
  
    function calculateTotal() {
      const tonnage = parseFloat(tonnageInput.value) || 0;
      const pricePerKg = parseFloat(priceInput.value) || 0;
      const total = tonnage * pricePerKg;
      totalInput.value = total.toFixed(2); // round to 2 decimal places
    }
  
    tonnageInput.addEventListener('input', calculateTotal);
    priceInput.addEventListener('input', calculateTotal);
  });


  document.addEventListener("DOMContentLoaded", () => {
    const tonnageInput = document.getElementById("tonnage");
    const availableStock = parseFloat(tonnageInput.getAttribute("data-available-stock"));
  
    tonnageInput.addEventListener("input", () => {
      const enteredTonnage = parseFloat(tonnageInput.value);
      if (enteredTonnage > availableStock) {
        alert(`Not enough stock available. Maximum available: ${availableStock}kg.`);
        tonnageInput.value = availableStock; // Reset to maximum available stock
      }
    });
  });
  

  
  //saleslist
  document.addEventListener("DOMContentLoaded", () => {
    // Select all table cells with the `data-date` attribute
    const dateCells = document.querySelectorAll("td[data-date]");
  
    dateCells.forEach((cell) => {
      const rawDate = cell.getAttribute("data-date"); // Get the raw date
      if (rawDate) {
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, 
        });
        cell.textContent = formattedDate; // Set the formatted date as the cell's content
      }
    });
  });