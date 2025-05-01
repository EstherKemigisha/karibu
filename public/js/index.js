


const welcomeText = document.querySelector('h1');

welcomeText.style.opacity = 0; 

window.addEventListener('load', () => {
    welcomeText.style.transition = 'opacity 1s ease-in-out';
    welcomeText.style.opacity = 1; 
});