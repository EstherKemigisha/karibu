document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

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
  function validateProduceField() {
    const produceField = document.getElementById("produce");
    if (produceField.value === "") {
      showError(produceField, "Please select a valid produce from the dropdown.");
    } else {
      clearError(produceField);
    }
  }

  function validateTypeField() {
    const typeField = document.getElementById("type");
    if (typeField.value === "") {
      showError(typeField, "Please select a valid type from the dropdown.");
    } else {
      clearError(typeField);
    }
  }

  function validateTonnageField() {
    const tonnageField = document.getElementById("tonnage");
    if (!tonnageField.value || tonnageField.value < 100) {
      showError(tonnageField, "Please enter a valid tonnage of at least 100kg.");
    } else {
      clearError(tonnageField);
    }
  }

  function validateBuyingPriceField() {
    const buyingPriceField = document.getElementById("buyingPrice");
    const value = parseFloat(buyingPriceField.value); // Convert the input value to a number
  
    if (isNaN(value) || value < 5) {
      showError(buyingPriceField, "Please enter a valid buying price of at least 5.");
    } else {
      clearError(buyingPriceField);
    }
  }

  function validateSellingPriceField() {
    const sellingPriceField = document.getElementById("sellingPrice");
    const buyingPriceField = document.getElementById("buyingPrice");
  
    const sellingPrice = parseFloat(sellingPriceField.value); // Convert selling price to a number
    const buyingPrice = parseFloat(buyingPriceField.value); // Convert buying price to a number
  
    if (sellingPrice <= buyingPrice) {
      showError(sellingPriceField, "Selling price must be greater than the buying price.");
    } else {
      clearError(sellingPriceField);
    }
  }

  function validateBranchField() {
    const branchField = document.getElementById("branch");
    if (!branchField.value) {
      showError(branchField, "Please select a branch.");
    } else {
      clearError(branchField);
    }
  }

  function validateDealersField() {
    const dealersField = document.getElementById("dealers");
    if (!dealersField.value.trim()) {
      showError(dealersField, "Please enter the dealer's name.");
    } else {
      clearError(dealersField);
    }
  }

  function validatePaymentMethodField() {
    const paymentMethodField = document.getElementById("paymentmethod");
    if (!paymentMethodField.value) {
      showError(paymentMethodField, "Please select a payment method.");
    } else {
      clearError(paymentMethodField);
    }
  }

  function validateDateField() {
    const dateField = document.getElementById("date");
    const dateValue = dateField.value;
  
    // Check if the date is valid
    if (!dateValue || isNaN(new Date(dateValue).getTime())) {
      showError(dateField, "Please select a valid date.");
    } else {
      clearError(dateField);
    }
  }

  function validateTimeField() {
    const timeField = document.getElementById("time");
    if (!timeField.value) {
      showError(timeField, "Please select a time.");
    } else {
      clearError(timeField);
    }
  }

  // Event Listeners for Validation
  document.getElementById("produce").addEventListener("blur", validateProduceField);
  document.getElementById("type").addEventListener("blur", validateTypeField);
  document.getElementById("tonnage").addEventListener("blur", validateTonnageField);
  document.getElementById("buyingPrice").addEventListener("blur", validateBuyingPriceField);
  document.getElementById("sellingPrice").addEventListener("blur", validateSellingPriceField);
  document.getElementById("branch").addEventListener("blur", validateBranchField);
  document.getElementById("dealers").addEventListener("blur", validateDealersField);
  document.getElementById("paymentmethod").addEventListener("blur", validatePaymentMethodField);
  document.getElementById("date").addEventListener("blur", validateDateField);
  document.getElementById("time").addEventListener("blur", validateTimeField);

  // Form Submission Validation
  form.addEventListener("submit", (event) => {
    validateProduceField();
    validateTypeField();
    validateTonnageField();
    validateBuyingPriceField();
    validateSellingPriceField();
    validateBranchField();
    validateDealersField();
    validatePaymentMethodField();
    validateDateField();
    validateTimeField();

    // Prevent form submission if there are errors
    const errors = form.querySelectorAll(".error");
    if (errors.length > 0) {
      event.preventDefault();
    }
  });
});

  