const bt=document.getElementById("btn");
bt.addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (name && role && status) {
        alert(`Name: ${name}\nRole: ${role}\nStatus: ${status}`);
    } else {
        alert("Please fill in all fields.");
    }
});
document.getElementById("name").addEventListener("input", function() {
    const name = this.value;
    if (name.length < 3) {
        this.setCustomValidity("Name must be at least 3 characters long.");
    } else {
        this.setCustomValidity("");
    }
});
document.getElementById("role").addEventListener("input", function() {
    const role = this.value;
    if (role.length < 3) {
        this.setCustomValidity("Role must be at least 3 characters long.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("status").addEventListener("change", function() {
    const status = this.value;
    if (status === "Terminated") {
        alert("You have selected 'Terminated'. Please confirm this action.");
    }
});
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (name && role && status) {
        alert(`Form submitted with:\nName: ${name}\nRole: ${role}\nStatus: ${status}`);
    } else {
        alert("Please fill in all fields before submitting.");
    }
});
document.querySelector("form").addEventListener("reset", function() {
    alert("Form has been reset.");
});
document.querySelector("form").addEventListener("change", function() {
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (name || role || status) {
        alert("Form fields have been changed.");
    }
});

const show=document.getElementById("show");
show.addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (name || role || status) {
        document.getElementById("showData").innerHTML = `
            <p>Name: ${name}</p>
            <p>Role: ${role}</p>
            <p>Status: ${status}</p>
        `;
    } else {
        alert("Please fill in all fields before showing data.");
    }
});
const showData = document.getElementById("showData");
if (showData) {
    showData.innerHTML = "<p>No data to display.</p>";
}
document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("name");
    const roleInput = document.getElementById("role");
    const statusSelect = document.getElementById("status");

    nameInput.value = "";
    roleInput.value = "";
    statusSelect.value = "Active"; // Default value
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.reset(); // Reset the form fields
    document.getElementById("showData").innerHTML = ""; // Clear any displayed data
});
 