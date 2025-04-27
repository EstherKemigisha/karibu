// // Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('loginform');
//     const registerForm = document.getElementById('form');
//     const switchToRegister = document.getElementById('switchToRegister');
//     const switchToLogin = document.getElementById('switchToLogin');
  
//     const loginSection = document.getElementById('login');
//     const registerSection = document.getElementById('register');
  
//     // Toggle between forms
//     switchToRegister.addEventListener('click', (e) => {
//       e.preventDefault();
//       loginSection.classList.remove('active');
//       registerSection.classList.add('active');
//     });
  
//     switchToLogin.addEventListener('click', (e) => {
//       e.preventDefault();
//       registerSection.classList.remove('active');
//       loginSection.classList.add('active');
//     });
  
//     // Login form validation
//     loginForm.addEventListener('submit', (e) => {
//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('loginPassword').value.trim();
  
//       if (!email || !validateEmail(email)) {
//         alert('Please enter a valid email.');
//         e.preventDefault();
//         return;
//       }
  
//       if (!password || password.length < 10) {
//         alert('Password must be at least 10 characters.');
//         e.preventDefault();
//         return;
//       }
//     });
  
//     // Register form validation
//     registerForm.addEventListener('submit', (e) => {
//       const email = document.getElementById('registerEmail').value.trim();
//       const password = document.getElementById('registerPassword').value.trim();
//       const confirm = document.getElementById('confirmPassword').value.trim();
//       const branch = document.querySelector('select[name="branch"]').value;
//       const role = document.querySelector('select[name="role"]').value;
  
//       if (!email || !validateEmail(email)) {
//         alert('Please enter a valid email address.');
//         e.preventDefault();
//         return;
//       }
  
//       if (!password || password.length < 10) {
//         alert('Password must be at least 10 characters.');
//         e.preventDefault();
//         return;
//       }
  
//       if (confirm !== password) {
//         alert('Passwords do not match.');
//         e.preventDefault();
//         return;
//       }
  
//       if (!branch) {
//         alert('Please select a branch.');
//         e.preventDefault();
//         return;
//       }
  
//       if (!role) {
//         alert('Please select a role.');
//         e.preventDefault();
//         return;
//       }
//     });
  
//     // Email validation helper
//     function validateEmail(email) {
//       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return re.test(email);
//     }
//   });

document.addEventListener('DOMContentLoaded', function() {
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFormSection = document.getElementById('login');
    const registerFormSection = document.getElementById('register');
  
    switchToRegister.addEventListener('click', function(e) {
      e.preventDefault();
      loginFormSection.classList.remove('active');
      registerFormSection.classList.add('active');
    });
  
    switchToLogin.addEventListener('click', function(e) {
      e.preventDefault();
      registerFormSection.classList.remove('active');
      loginFormSection.classList.add('active');
    });
  
    // --- Branch visibility logic ---
    const roleSelect = document.getElementById('select');
    const branchSection = document.querySelector('.branch-section');
  
    function toggleBranchVisibility() {
      if (roleSelect.value === 'Director') {
        branchSection.style.display = 'none';
      } else if (roleSelect.value) { // Only show if a role other than "Select Role" is chosen
        branchSection.style.display = 'block';
      } else {
        branchSection.style.display = 'block'; // Show by default or when "Select Role" is chosen
      }
    }
  
    // Initial state on page load
    toggleBranchVisibility();
  
    // Listen for changes in the role dropdown
    roleSelect.addEventListener('change', toggleBranchVisibility);
  });

  // Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

  // Switch between login and register forms
  document.getElementById('switchToRegister').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login').classList.remove('active');
    document.getElementById('register').classList.add('active');
  });

  document.getElementById('switchToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register').classList.remove('active');
    document.getElementById('login').classList.add('active');
  });

  // Login form validation
  document.getElementById('loginform').addEventListener('submit', function(e) {
    const email = document.getElementById('email');
    const password = document.getElementById('loginPassword');
    let valid = true;

    clearErrors();

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

  // Register form validation
  document.getElementById('form').addEventListener('submit', function(e) {
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirm = document.getElementById('confirmPassword');
    const role = document.getElementById('select');
    let valid = true;

    clearErrors();

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
    } else if (password.value.length < 6) {
      showError(password, 'Password must be at least 6 characters');
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
  document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('registerPassword').value;
    const confirm = this.value;
    
    if (password && confirm && password !== confirm) {
      showError(this, 'Passwords do not match');
    } else {
      clearError(this);
    }
  });

  // Helper functions
  function showError(input, message) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('.error-message') || document.createElement('small');
    error.className = 'error-message';
    error.textContent = message;
    formControl.appendChild(error);
    input.classList.add('error');
  }

  function clearError(input) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('.error-message');
    if (error) error.remove();
    input.classList.remove('error');
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(el => {
      el.remove();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});