function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    
    // Retrieve registered user database
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Find matching user credentials
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (user) {
        // Save active session state
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password!");
    }
}
