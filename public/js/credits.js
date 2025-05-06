document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  const fields = {
    buyersname: document.querySelector('input[name="buyersname"]'),
    nationalid: document.querySelector('input[name="nationalid"]'),
    address: document.querySelector('input[name="address"]'),
    contact: document.querySelector('input[name="contact"]'),
    amountD: document.querySelector('input[name="amountD"]'),
    tonnage: document.querySelector('input[name="tonnage"]'),
    salesagent: document.querySelector('input[name="salesagent"]'),
    producename: document.querySelector('input[name="producename"]'),
    producetype: document.querySelector('input[name="producetype"]'),
    amount: document.querySelector('input[name="amount"]'),
    duedate: document.querySelector('input[name="duedate"]')
  };

  form.addEventListener('submit', function (e) {
    let isValid = true;

    Object.entries(fields).forEach(([key, input]) => {
      const value = input.value.trim();
      const errorId = `${input.id}-error`;
      removeError(input, errorId);

      if (value === '') {
        showError(input, 'This field is required.', errorId);
        isValid = false;
      } else if (key === 'buyersname' && !/^\w+\s+\w+/.test(value)) {
        showError(input, 'Please enter at least two names (e.g., Firstname Lastname).', errorId);
        isValid = false;
      
      } else {
        if (key === 'contact' && !/^\+256\d{9}$/.test(value)) {
          showError(input, 'Enter a valid phone number starting with +256 followed by 9 digits.', errorId);
          isValid = false;
        }
        if (['amountD', 'amount', 'tonnage'].includes(key)) {
          if (isNaN(value) || Number(value) < 100) {
            showError(input, 'Enter a valid number greater than or equal to 100.', errorId);
            isValid = false;
          }
        }
        if (key === 'nationalid' && !/^[A-Za-z]{2}\d{12}$/.test(value)) {
          showError(input, 'NIN must start with 2 letters followed by 12 digits.', errorId);
          isValid = false;
        }
        if (key === 'duedate') {
          const dueDate = new Date(value);
          const today = new Date();
          if (dueDate <= today) {
            showError(input, 'Due date must be in the future.', errorId);
            isValid = false;
          }
        }
      }
    });

    // Stop submission if not valid
    if (!isValid) {
      e.preventDefault(); // Prevent form refresh or submission
    }
  });

  function showError(input, message, errorId) {
    input.style.border = '2px solid red';
    const error = document.createElement('div');
    error.className = 'error-message';
    error.id = errorId;
    error.style.color = 'red';
    error.style.fontSize = '0.85em';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  function removeError(input, errorId) {
    input.style.border = '1px solid #ccc';
    const oldError = document.getElementById(errorId);
    if (oldError) oldError.remove();
  }
});



  
