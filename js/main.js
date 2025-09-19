// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });

  // Navigation menu toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Create animated background particles
  createParticles();

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(number => {
    observer.observe(number);
  });

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.add('visible');
            }, 10);
          } else if (card.classList.contains(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.add('visible');
            }, 10);
          } else {
            card.classList.remove('visible');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Basic validation
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      if (!name.value.trim()) {
        valid = false;
        showError(name, 'Name is required');
      } else {
        removeError(name);
      }
      
      if (!email.value.trim()) {
        valid = false;
        showError(email, 'Email is required');
      } else if (!isValidEmail(email.value)) {
        valid = false;
        showError(email, 'Please enter a valid email');
      } else {
        removeError(email);
      }
      
      if (!message.value.trim()) {
        valid = false;
        showError(message, 'Message is required');
      } else {
        removeError(message);
      }
      
      if (valid) {
        // Show success message (in a real scenario, you would submit the form)
        const formStatus = document.createElement('div');
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Your message has been sent successfully!';
        contactForm.appendChild(formStatus);
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
          formStatus.remove();
        }, 3000);
      }
    });
  }
});

// Function to create animated background particles
function createParticles() {
  const particleContainer = document.querySelector('.particle-container');
  if (!particleContainer) return;

  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    
    // Random size
    const size = Math.random() * 30 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Random animation duration
    particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
    
    particleContainer.appendChild(particle);
  }
}

// Function to animate counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const duration = 2000; // 2 seconds
  const stepTime = duration / 100;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);
    
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, stepTime);
}

// Helper function to validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Helper function to show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  
  if (!formGroup.querySelector('.error-message')) {
    errorElement.className = 'error-message';
    formGroup.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  input.classList.add('error');
}

// Helper function to remove error message
function removeError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  input.classList.remove('error');
}
