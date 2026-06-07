function loadDashboard(){

    const userName =
        localStorage.getItem("userName")
        || "User";

    document.getElementById("welcomeUser")
        .innerText =
        `Welcome ${userName}`;
}

loadDashboard();