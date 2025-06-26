// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Navbar background change on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
  
  // Contact form submission
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!firstName || !lastName || !email || !phone || !service) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We will contact you soon.');
      this.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
  
  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .feature-item');
    animatedElements.forEach(el => {
      el.classList.add('loading');
      observer.observe(el);
    });
  });
  
  // Counter animation for hero stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + 'K+';
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 20);
  }
  
  // Initialize counter animation when hero section is visible
  const heroStatsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(statNumber => {
          const text = statNumber.textContent;
          if (text.includes('15+')) {
            animateCounter(statNumber, 15);
          } else if (text.includes('10K+')) {
            animateCounter(statNumber, 10000);
          } else if (text.includes('24/7')) {
            statNumber.textContent = '24/7';
          }
        });
        heroStatsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    heroStatsObserver.observe(heroStats);
  }
  
  // Mobile menu close on link click
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        navbarToggler.click();
      }
    });
  });
  
  // Preload images for better performance
  function preloadImages() {
    const images = [
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Initialize preloading
  preloadImages();
  
  // Add loading states and error handling for images
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        console.warn('Failed to load image:', this.src);
      });
      
      // Set initial opacity
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    });
  });
  
  // Add scroll-to-top functionality
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add hover effects for service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  console.log('MedCare Clinic website loaded successfully!');