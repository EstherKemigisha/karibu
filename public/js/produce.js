document.getElementById('form').addEventListener('submit', function(event) {
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
  
 
  const errorFields = document.querySelectorAll('.error-highlight');
  errorFields.forEach(field => field.classList.remove('error-highlight'));

  let formIsValid = true;

 
  const requiredFields = [
    { id: 'produce', message: 'Please select a produce' },
    { id: 'type', message: 'Please select a type' },
    { id: 'tonnage', message: 'Please enter tonnage amount' },
    { id: 'buyingPrice', message: 'Please enter buying price' },
    { id: 'sellingPrice', message: 'Please enter selling price' },
    { id: 'branch', message: 'Please select a branch' },
    { id: 'dealers', message: 'Please enter dealer name' },
    { id: 'paymentmethod', message: 'Please select payment method' },
    { id: 'date', message: 'Please select date' },
    { id: 'time', message: 'Please select time' }
  ];

  requiredFields.forEach(field => {
    const input = document.getElementById(field.id);
    if (!input.value.trim()) {
      showError(input, field.message);
      formIsValid = false;
    }
  });

 
  const numberFields = ['tonnage', 'buyingPrice', 'sellingPrice'];
  numberFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input.value && isNaN(parseFloat(input.value))) {
      showError(input, 'Please enter a valid number');
      formIsValid = false;
    }
  });


  const buyingPrice = parseFloat(document.getElementById('buyingPrice').value);
  const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
  if (buyingPrice && sellingPrice && sellingPrice <= buyingPrice) {
    const sellingInput = document.getElementById('sellingPrice');
    showError(sellingInput, 'Selling price must be greater than buying price');
    formIsValid = false;
  }

  if (!formIsValid) {
    event.preventDefault();
  }
});

function showError(input, message) {
  
  input.classList.add('error-highlight');
  
  
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  
  
  input.parentNode.insertBefore(error, input.nextSibling);
}
  