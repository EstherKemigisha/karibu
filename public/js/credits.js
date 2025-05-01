
document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('form');
  const cancelBtn = document.querySelector('.cancel-button');

  
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

  
  function checkField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const rules = fieldRules[fieldId];
    
    
    field.classList.remove('error');
    const oldError = field.nextElementSibling;
    if (oldError && oldError.classList.contains('error-msg')) {
      oldError.remove();
    }

    
    if (rules.required && !value) {
      showError(field, rules.message);
      return false;
    }

    
    if (rules.pattern && !rules.pattern.test(value)) {
      showError(field, rules.message);
      return false;
    }

  
    if (rules.isNumber && isNaN(value)) {
      showError(field, rules.message);
      return false;
    }

  
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

  
  function showError(field, message) {
    field.classList.add('error');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-msg';
    errorMsg.textContent = message;
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '0.8rem';
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
  }

  
  function validateForm() {
    let isValid = true;
    for (const fieldId in fieldRules) {
      if (!checkField(fieldId)) {
        isValid = false;
      }
    }
    return isValid;
  }

  
  for (const fieldId in fieldRules) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', function() {
        checkField(fieldId);
      });
    }
  }


  cancelBtn.addEventListener('click', function() {
    if (confirm('Cancel this form?')) {
      window.location.href = '/';
    }
  });


  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
    
      const submitBtn = document.querySelector('.request-payment-button');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      
    
      form.submit();
    }
  });
});

  
