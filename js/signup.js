function signupUser(){

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "userEmail",
        email
    );

    alert("Signup Successful!");

    window.location.href =
        "dashboard.html";
}