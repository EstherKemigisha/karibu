// Wait until page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the form and cancel button
  const form = document.getElementById('form');
  const cancelBtn = document.querySelector('.cancel-button');

  // Simple validation rules
  const fieldRules = {
    name: { required: true, message: "Please enter buyer's name" },
    nationalid: { 
      required: true, 
      pattern: /^\d{13}$/, 
      message: "NIN must be 13 digits" 
    },
    address: { required: true, message: "Please enter address" },
    contact: { 
      required: true, 
      pattern: /^\d{10}$/, 
      message: "Phone must be 10 digits" 
    },
    amountdue: { 
      required: true, 
      isNumber: true, 
      message: "Amount must be a number" 
    },
    tonnage: { 
      required: true, 
      isNumber: true, 
      message: "Tonnage must be a number" 
    },
    salesagent: { required: true, message: "Please enter agent name" },
    produce: { required: true, message: "Please select produce" },
    producetype: { required: true, message: "Please select produce type" },
    amount: { 
      required: true, 
      isNumber: true, 
      message: "Amount must be a number" 
    },
    dueDate: { 
      required: true, 
      isFutureDate: true, 
      message: "Date must be in future" 
    }
  };

  // Check if a field is valid
  function checkField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const rules = fieldRules[fieldId];
    
    // Clear previous errors
    field.classList.remove('error');
    const oldError = field.nextElementSibling;
    if (oldError && oldError.classList.contains('error-msg')) {
      oldError.remove();
    }

    // Check required field
    if (rules.required && !value) {
      showError(field, rules.message);
      return false;
    }

    // Check pattern (like for phone numbers)
    if (rules.pattern && !rules.pattern.test(value)) {
      showError(field, rules.message);
      return false;
    }

    // Check if value is a number
    if (rules.isNumber && isNaN(value)) {
      showError(field, rules.message);
      return false;
    }

    // Check date is in future
    if (rules.isFutureDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(value) < today) {
        showError(field, rules.message);
        return false;
      }
    }

    return true;
  }

  // Show error message
  function showError(field, message) {
    field.classList.add('error');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-msg';
    errorMsg.textContent = message;
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '0.8rem';
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
  }

  // Validate entire form
  function validateForm() {
    let isValid = true;
    for (const fieldId in fieldRules) {
      if (!checkField(fieldId)) {
        isValid = false;
      }
    }
    return isValid;
  }

  // Add validation when leaving fields
  for (const fieldId in fieldRules) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', function() {
        checkField(fieldId);
      });
    }
  }

  // Cancel button - go back to home page
  cancelBtn.addEventListener('click', function() {
    if (confirm('Cancel this form?')) {
      window.location.href = '/';
    }
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      // Show loading spinner
      const submitBtn = document.querySelector('.request-payment-button');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      
      // Submit the form
      form.submit();
    }
  });
});

  
