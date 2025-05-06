function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
  
    let isValid = true;
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Invalid email format. Please enter a valid email.';
      emailError.classList.add('active'); // Show the error message
      isValid = false;
    } else {
      emailError.textContent = '';
      emailError.classList.remove('active'); // Hide the error message
    }
  
    // Password validation regex (8 characters, uppercase, lowercase, number, special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      passwordError.textContent = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
      passwordError.classList.add('active'); // Show the error message
      isValid = false;
    } else {
      passwordError.textContent = '';
      passwordError.classList.remove('active'); // Hide the error message
    }
  
    // Prevent form submission if validation fails
    if (!isValid) {
      return false;
    }
  
    // If valid, simulate login success (you can replace this with an API call)
    alert('Login successful!');
    return true;
  }