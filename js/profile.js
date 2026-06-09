function loadProfile() {
    const name = localStorage.getItem("userName") || "Guest User";
    const email = localStorage.getItem("userEmail") || "guest@email.com";
    const role = localStorage.getItem("userRole") || "Frontend Developer";
    const company = localStorage.getItem("userCompany") || "Google";

    // Update display content
    document.getElementById("userName").innerText = name;
    document.getElementById("userEmail").innerText = email;
    document.getElementById("userRole").innerText = role;
    document.getElementById("userCompany").innerText = company;

    // Generate and set initials avatar
    const avatar = document.getElementById("profileAvatar");
    if (avatar) {
        const initials = name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();
        avatar.innerText = initials || "U";
    }
}

function toggleEditMode(showEdit) {
    const viewSection = document.getElementById("profileView");
    const editSection = document.getElementById("profileEdit");

    if (showEdit) {
        // Pre-populate input fields
        document.getElementById("editName").value = document.getElementById("userName").innerText;
        document.getElementById("editEmail").value = document.getElementById("userEmail").innerText;
        document.getElementById("editRole").value = document.getElementById("userRole").innerText;
        document.getElementById("editCompany").value = document.getElementById("userCompany").innerText;

        viewSection.style.display = "none";
        editSection.style.display = "block";
    } else {
        viewSection.style.display = "block";
        editSection.style.display = "none";
    }
}

function saveProfileChanges() {
    const newName = document.getElementById("editName").value.trim();
    const newEmail = document.getElementById("editEmail").value.trim();
    const newRole = document.getElementById("editRole").value;
    const newCompany = document.getElementById("editCompany").value;

    if (!newName || !newEmail) {
        alert("Name and email are required fields.");
        return;
    }

    // Save preferences to localStorage
    localStorage.setItem("userName", newName);
    localStorage.setItem("userEmail", newEmail);
    localStorage.setItem("userRole", newRole);
    localStorage.setItem("userCompany", newCompany);

    // Reload presentation mode
    loadProfile();
    toggleEditMode(false);

    // Sync parent greeting header if running inside iframe
    if (window.parent && window.parent.document) {
        const welcomeHeader = window.parent.document.querySelector('.welcome-header h1');
        if (welcomeHeader) {
            welcomeHeader.textContent = `Welcome, ${newName}`;
        }
    }
}

// Initial profile load
loadProfile();