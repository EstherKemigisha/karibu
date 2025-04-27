// /public/js/users.js

document.addEventListener('DOMContentLoaded', function() {
  const firstNameInput = document.querySelector('input[placeholder="Firstname"]');
  const lastNameInput = document.querySelector('input[placeholder="Lastname"]');
  const emailInput = document.querySelector('input[placeholder="Email"]');
  const roleSelect = document.getElementById('role');
  const branchSelect = document.getElementById('branch');
  const addUserButton = document.querySelector('button');

  addUserButton.addEventListener('click', function() {
    const firstName = firstNameInput.value.trim(); // Trim whitespace
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleSelect.value;
    const branch = branchSelect.value;

    // Validation
    let isValid = true;
    let errorMessage = '';

    if (!firstName) {
      errorMessage += 'First name is required.\n';
      isValid = false;
    }

    if (!lastName) {
      errorMessage += 'Last name is required.\n';
      isValid = false;
    }

    if (!email) {
      errorMessage += 'Email is required.\n';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errorMessage += 'Invalid email format.\n';
      isValid = false;
    }

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    // You can now send this data to your server or perform other actions.
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      branch: branch,
    };

    console.log('User data:', userData); // For debugging purposes

    // Example of sending data to a server using fetch:
    fetch('/api/users', { // Replace '/api/users' with your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('User added successfully!');
      // Optionally clear the form or perform other actions
      firstNameInput.value = '';
      lastNameInput.value = '';
      emailInput.value = '';
      roleSelect.value = 'sales'; //reset to default
      branchSelect.value = 'maganjo'; //reset to default
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to add user.');
    });

  });

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
