// // script.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Smooth scrolling for navigation links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();

//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth'
//             });
//         });
//     });

//     // Example: Simple "Sign Up" button click handler
//     const signupButton = document.querySelector('.signup-btn');
//     if (signupButton) {
//         signupButton.addEventListener('click', function(e) {
//             e.preventDefault(); // Prevent default link behavior

//             // You can replace this with your actual signup logic
//             alert('Redirecting to the Sign Up page...');
//             // window.location.href = '/signup'; // Redirect to signup page
//         });
//     }

//     // Example: Add a simple animation on hero image hover
//     const heroImage = document.querySelector('.hero-image img');
//     if (heroImage) {
//         heroImage.addEventListener('mouseover', function() {
//             this.style.transform = 'scale(1.05)';
//             this.style.transition = 'transform 0.3s ease';
//         });

//         heroImage.addEventListener('mouseout', function() {
//             this.style.transform = 'scale(1)';
//             this.style.transition = 'transform 0.3s ease';
//         });
//     }

//     // Example: Add active class to navigation links on scroll (optional, if you have sections)
//     const sections = document.querySelectorAll('section');
//     const navLinks = document.querySelectorAll('header nav ul li a');

//     function highlightNavigation() {
//         let scrollY = window.pageYOffset;

//         sections.forEach((section, index) => {
//             const sectionTop = section.offsetTop - 50; // Adjust offset as needed
//             const sectionHeight = section.offsetHeight;

//             if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//                 navLinks.forEach(link => link.classList.remove('active'));
//                 navLinks[index].classList.add('active');
//             }
//         });
//     }

//     window.addEventListener('scroll', highlightNavigation);
// });

// script.js
const welcomeText = document.querySelector('h1');

welcomeText.style.opacity = 0; // Start invisible

window.addEventListener('load', () => {
    welcomeText.style.transition = 'opacity 1s ease-in-out';
    welcomeText.style.opacity = 1; // Fade in
});