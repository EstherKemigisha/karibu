
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
  document.getElementById('loginform').addEventListener('submit', function (e) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('loginPassword');
    let valid = true;

    clearErrors(this); // Clear previous errors for the login form

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email.');
      valid = false;
    }

    if (!passwordInput.value) {
      showError(passwordInput, 'Password is required.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  // --- Register Form Validation ---
  document.getElementById('form').addEventListener('submit', function (e) {
    const fullNameInput = document.getElementById('fullName');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const roleSelect = document.getElementById('select');
    let valid = true;

    clearErrors(this); // Clear previous errors for the register form

    if (!fullNameInput.value.trim()) {
      showError(fullNameInput, 'Full Name is required.');
      valid = false;
    } else if (fullNameInput.value.trim().split(' ').length < 2) {
      showError(fullNameInput, 'Please enter both first and last name.');
      valid = false;
    }
    

    if (!registerEmailInput.value.trim()) {
      showError(registerEmailInput, 'Email is required.');
      valid = false;
    } else if (!isValidEmail(registerEmailInput.value.trim())) {
      showError(registerEmailInput, 'Please enter a valid email.');
      valid = false;
    }

    if (!registerPasswordInput.value) {
      showError(registerPasswordInput, 'Password is required.');
      valid = false;
    } else if (registerPasswordInput.value.length < 8) {
      showError(registerPasswordInput, 'Password must be at least 8 characters long.');
      valid = false;
    }else if (!/[!@#$%^&*(),.?":{}|<>]/.test(registerPasswordInput.value)) {
      showError(registerPasswordInput, 'Password must contain at least one special character.');
      valid = false;
    }

    if (!roleSelect.value) {
      showError(roleSelect, 'Please select a role.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  // --- Helper Functions ---
  function showError(input, message) {
    const formControl = input.parentElement;
    const errorSpan = formControl.querySelector('.error-message');
    errorSpan.textContent = message;
  }

  function clearErrors(form) {
    const errorSpans = form.querySelectorAll('.form-control .error-message');
    errorSpans.forEach(span => {
      span.textContent = '';
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});



//login
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

  // --- Login Form Validation ---
  document.getElementById('login').addEventListener('submit', function (e) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('loginPassword');
    let valid = true;

    clearErrors(this); // Clear previous errors for the login form

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email.');
      valid = false;
    }

    if (!passwordInput.value) {
      showError(passwordInput, 'Password is required.');
      valid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, 'Password must be at least 8 characters long.');
      valid = false;
    }else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
    showError(passwordInput, 'Password must contain at least one special character.');
    valid = false;
  }
  

    if (!valid) {
      e.preventDefault();
    }
  });

  // --- Register Form Validation ---
  document.getElementById('registerForm').addEventListener('submit', function (e) {
    const usernameInput = document.getElementById('registerUsername');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const roleSelect = document.getElementById('select');
    let valid = true;

    clearErrors(this); // Clear previous errors for the register form

    if (!usernameInput.value.trim()) {
      showError(usernameInput, 'Username is required.');
      valid = false;
    }

    if (!registerEmailInput.value.trim()) {
      showError(registerEmailInput, 'Email is required.');
      valid = false;
    } else if (!isValidEmail(registerEmailInput.value.trim())) {
      showError(registerEmailInput, 'Please enter a valid email.');
      valid = false;
    }

    if (!registerPasswordInput.value) {
      showError(registerPasswordInput, 'Password is required.');
      valid = false;
    } else if (registerPasswordInput.value.length < 8) {
      showError(registerPasswordInput, 'Password must be at least 8 characters long.');
      valid = false;
    }

    if (confirmPasswordInput.value !== registerPasswordInput.value) {
      showError(confirmPasswordInput, 'Passwords do not match.');
      valid = false;
    }

    if (!roleSelect.value) {
      showError(roleSelect, 'Please select a role.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  // --- Helper Functions ---
  function showError(input, message) {
    const formControl = input.parentElement;
    const errorSpan = formControl.querySelector('.error-message');
    errorSpan.textContent = message;
  }

  function clearErrors(form) {
    const errorSpans = form.querySelectorAll('.form-control .error-message');
    errorSpans.forEach(span => {
      span.textContent = '';
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
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