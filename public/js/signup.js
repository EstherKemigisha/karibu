document.addEventListener('DOMContentLoaded', function () {
  // --- Switch Between Login and Register Forms ---
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');
  const loginFormSection = document.getElementById('login');
  const registerFormSection = document.getElementById('register');

  switchToRegister.addEventListener('click', function (e) {
    e.preventDefault();
    loginFormSection.classList.remove('active');
    registerFormSection.classList.add('active');
  });

  switchToLogin.addEventListener('click', function (e) {
    e.preventDefault();
    registerFormSection.classList.remove('active');
    loginFormSection.classList.add('active');
  });

  // --- Branch Visibility Logic ---
  const roleSelect = document.getElementById('select');
  const branchSection = document.querySelector('.branch-section');

  function toggleBranchVisibility() {
    const selectedRole = roleSelect.value.toLowerCase();

    if (selectedRole === 'director') {
      branchSection.style.display = 'none';
    } else if (selectedRole === 'sales agent' || selectedRole === 'manager') {
      branchSection.style.display = 'block';
    } else {
      branchSection.style.display = 'block'; // Default visibility
    }
  }

  // Initial state on page load
  toggleBranchVisibility();

  // Listen for changes in the role dropdown
  roleSelect.addEventListener('change', toggleBranchVisibility);

  // --- Login Form Validation ---
  document.getElementById('login').addEventListener('submit', function (e) {
    const email = document.getElementById('email');
    const password = document.getElementById('loginPassword');
    let valid = true;

    if (!email.value) {
      showError(email, 'Email is required');
      valid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      valid = false;
    }

    if (!password.value) {
      showError(password, 'Password is required');
      valid = false;
    }

    if (!valid) e.preventDefault();
  });

  // --- Register Form Validation ---
  document.getElementById('register').addEventListener('submit', function (e) {
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirm = document.getElementById('confirmPassword');
    const role = document.getElementById('select');
    let valid = true;

    if (!email.value) {
      showError(email, 'Email is required');
      valid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      valid = false;
    }

    if (!password.value) {
      showError(password, 'Password is required');
      valid = false;
    } else if (!isValidPassword(password.value)) {
      showError(
        password,
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
      );
      valid = false;
    }

    if (password.value !== confirm.value) {
      showError(confirm, 'Passwords do not match');
      valid = false;
    }

    if (!role.value) {
      showError(role, 'Please select a role');
      valid = false;
    }

    if (!valid) e.preventDefault();
  });

  // Real-time password confirmation check
  document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('registerPassword').value;
    const confirm = this.value;

    if (password && confirm && password !== confirm) {
      showError(this, 'Passwords do not match');
    } else {
      clearError(this);
    }
  });

  // --- Helper Functions ---
  function showError(input, message) {
    const formControl = input.parentElement;
    let error = formControl.querySelector('.error-message');

    if (!error) {
      error = document.createElement('small');
      error.className = 'error-message';
      formControl.appendChild(error);
    }

    error.textContent = message;
    error.style.color = 'red'; // Set error message color to red
    input.classList.add('error');
  }

  function clearError(input) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('.error-message');
    if (error) error.remove();
    input.classList.remove('error');
  }

  function isValidEmail(email) {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // Regex for validating password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
});
