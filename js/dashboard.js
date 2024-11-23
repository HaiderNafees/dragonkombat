document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase Auth
    const auth = firebase.auth();
    
    // Get logout button
    const logoutButton = document.getElementById('logoutButton');

    // Add click event listener to logout button
    logoutButton.addEventListener('click', function() {
        firebase.auth().signOut()
            .then(() => {
                localStorage.clear(); // Clear any stored game data
                window.location.replace('index.html'); // Force redirect to index
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    });

    // Check authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            // Update user name
            document.querySelector('.user-name').textContent = user.displayName || user.email;
        } else {
            // If not logged in, redirect to index
            window.location.replace('index.html');
        }
    });
});