document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    loader.style.display = 'none';
  }

  const clickingArea = document.getElementById('clicking-area');
  const tokenCount = document.getElementById('token-count');
  let points = 0;

  function createCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = Math.random() * (clickingArea.offsetWidth - 50) + 'px';
    coin.style.top = Math.random() * (clickingArea.offsetHeight - 50) + 'px';
    
    coin.addEventListener('click', () => {
      points += 10;
      tokenCount.textContent = points;
      coin.remove();
      setTimeout(createCoin, 1000);
    });
    
    clickingArea.appendChild(coin);
  }

  // Create initial coins
  for(let i = 0; i < 5; i++) {
    createCoin();
  }
}); 

// Scroll animation for text
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-text');
        }
    });
}, observerOptions);

// Add this class to elements you want to animate on scroll
document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
}); 

function updateCountdown() {
    const targetDate = new Date('March 31, 2025 00:00:00').getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeDifference = targetDate - now;
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (timeDifference < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "EXPIRED";
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', updateCountdown); 

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('authModal');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const closeBtn = document.querySelector('.close');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Open modal
  getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });

  // Tab switching
  authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Remove active class from all tabs and forms
          authTabs.forEach(t => t.classList.remove('active'));
          authForms.forEach(f => f.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding form
          tab.classList.add('active');
          document.querySelector(`#${tab.dataset.tab}Form`).classList.add('active');
      });
  });

  // Handle login form submission
  loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;

      try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok) {
              // Store token in localStorage
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              window.location.href = 'dashboard.html';
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
      }
  });

  // Handle signup form submission
  signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const fullName = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;
      const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

      if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
      }

      try {
          const response = await fetch('http://localhost:5000/api/auth/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ fullName, email, password })
          });

          const data = await response.json();

          if (response.ok) {
              // Store token in localStorage
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              window.location.href = 'dashboard.html';
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
      }
  });
});