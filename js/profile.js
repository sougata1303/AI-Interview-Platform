function loadProfile(){

    const name =
        localStorage.getItem("userName")
        || "Guest User";

    const email =
        localStorage.getItem("userEmail")
        || "guest@email.com";

    document.getElementById("userName").innerText =
        name;

    document.getElementById("userEmail").innerText =
        email;
}

function editProfile(){

    const newName =
        prompt("Enter New Name");

    if(newName){

        localStorage.setItem(
            "userName",
            newName
        );

        loadProfile();
    }
}

loadProfile();