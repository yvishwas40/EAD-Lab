document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    if (email === "" || password === "") {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = "Invalid email format!";
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters!";
        return;
    }

    errorMessage.textContent = "";
    alert("Login successful!"); // Simulating login success
});

// Email validation function
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
