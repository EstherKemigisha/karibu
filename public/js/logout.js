document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutBtn');
    const confirmationMessage = document.getElementById('confirmation-message');
  
   
    confirmationMessage.style.display = 'none';
  
    logoutButton.addEventListener('click', function() {
     
      fetch('/api/logout', { // Replace with your actual logout endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
     
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logout successful:', data);
      
        confirmationMessage.style.display = 'block';
  
       
        setTimeout(function() {
          window.location.href = '/login'; 
        }, 1500); 
  
      })
      .catch(error => {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
      });
  
    });
  });