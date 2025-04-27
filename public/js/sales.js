document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('salesRecordForm');
  
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      clearErrors();
      
      if (validateForm()) {
          // If form is valid, submit it
          this.submit();
      }
  });
  
  // Add event listeners to clear errors when user starts typing
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
      input.addEventListener('input', function() {
          clearErrorForField(this);
      });
  });
});

function validateForm() {
  let isValid = true;

  // Validate produce name
  if (!validateField('produceName', 'Please select a produce')) {
      isValid = false;
  }

  // Validate tonnage
  if (!validateField('tonnage', 'Please enter valid tonnage (must be > 0)', value => {
      return value && parseFloat(value) > 0;
  })) {
      isValid = false;
  }

  // Validate price per kg (optional)
  if (!validateField('pricePerkg', 'Price must be > 0 if provided', value => {
      return !value || parseFloat(value) > 0;
  })) {
      isValid = false;
  }

  // Validate amount paid
  if (!validateField('amountPaid', 'Please enter valid amount (must be > 0)', value => {
      return value && parseFloat(value) > 0;
  })) {
      isValid = false;
  }

  // Validate quantity sold (optional)
  if (!validateField('quantitysold', 'Quantity must be > 0 if provided', value => {
      return !value || parseFloat(value) > 0;
  })) {
      isValid = false;
  }

  // Validate buyer name
  if (!validateField('buyerName', 'Please enter buyer name', value => {
      return value.trim() !== '';
  })) {
      isValid = false;
  }

  // Validate sales agent name
  if (!validateField('salesAgentName', 'Please enter sales agent name', value => {
      return value.trim() !== '';
  })) {
      isValid = false;
  }

  // Validate date/time
  if (!validateField('dateTime', 'Please select date and time', value => {
      return value !== '';
  })) {
      isValid = false;
  }

  return isValid;
}

function validateField(fieldId, errorMessage, validationFn = (value) => !!value) {
  const field = document.getElementById(fieldId);
  if (!validationFn(field.value)) {
      showError(field, errorMessage);
      return false;
  }
  return true;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  let errorElement = formGroup.querySelector('.error-message');
  
  if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
  }
  
  input.classList.add('error-field');
  errorElement.textContent = message;
}

function clearErrorForField(field) {
  const formGroup = field.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  if (errorElement) {
      errorElement.remove();
  }
  field.classList.remove('error-field');
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
}