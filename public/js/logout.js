document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutBtn');
    const confirmationMessage = document.getElementById('confirmation-message');
  
    // Initially hide the confirmation message
    confirmationMessage.style.display = 'none';
  
    logoutButton.addEventListener('click', function() {
      // Perform logout actions here (e.g., clear session, send request to server)
      // Example:
      fetch('/api/logout', { // Replace with your actual logout endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You might need to include authentication tokens here
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logout successful:', data);
        // Display confirmation message and potentially redirect
        confirmationMessage.style.display = 'block';
  
        // Example redirection after a delay:
        setTimeout(function() {
          window.location.href = '/login'; // Replace '/login' with your login page URL
        }, 1500); // Redirect after 1.5 seconds
  
      })
      .catch(error => {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
      });
  
    });
  });