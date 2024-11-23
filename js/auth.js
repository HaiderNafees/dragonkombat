document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const modal = document.getElementById('authModal');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const closeBtn = document.querySelector('.close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Firebase Auth instance
    const auth = firebase.auth();

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            if (userCredential.user) {
                modal.style.display = 'none';
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.log('Login error:', error.code);
            // Silently handle errors - no alerts
        }
    });

    // Signup form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const fullName = signupForm.fullName.value;

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            if (userCredential.user) {
                await userCredential.user.updateProfile({
                    displayName: fullName
                });
                modal.style.display = 'none';
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.log('Signup error:', error.code);
            // Silently handle errors - no alerts
        }
    });

    // Modal controls
    getStartedBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`#${tab.dataset.tab}Form`).classList.add('active');
        });
    });

    // Check auth state
    auth.onAuthStateChanged(user => {
        if (user && window.location.pathname.includes('index.html')) {
            window.location.href = 'dashboard.html';
        }
    });
}); 