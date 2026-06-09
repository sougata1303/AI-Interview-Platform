function signupUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Retrieve existing registered accounts
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user email exists in either the users database OR legacy localStorage keys
    const legacyEmail = localStorage.getItem("userEmail");
    const emailExistsInDB = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    const emailExistsInLegacy = legacyEmail && legacyEmail.toLowerCase() === email.toLowerCase();
    
    if (emailExistsInDB || emailExistsInLegacy) {
        alert("An account with this email already exists!");
        return;
    }

    // Save new account
    users.push({
        name: name,
        email: email,
        password: password
    });
    localStorage.setItem("users", JSON.stringify(users));

    // Save active session state
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    alert("Signup Successful!");
    window.location.href = "dashboard.html";
}