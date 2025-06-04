// Admin login page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable button and show loading state
            loginButton.disabled = true;
            loginButton.textContent = 'Kirish...';
            errorMessage.classList.remove('show');

            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            request.post("login", {email, password})
            .then(response => {
                alert('Kirish login successfully!');
                localStorage.setItem('token', response.data.token);
                window.location.href="dashboard.html"
            })
            .catch(error => {
                console.log("ERROR: " + error.message);
                alert("Kirish login error");
            })
        });
    }
});


