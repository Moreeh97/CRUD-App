const name = document.getElementById("name");
const role = document.getElementById("role");
const status = document.getElementById("status");

const btn = document.getElementById("btn");

const showBtn = document.getElementById("show");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const restoreBtn = document.getElementById("restore");

const form = document.querySelector("form");
const formContainer = document.querySelector(".form-container");
const counter = document.getElementById("counter");
const table = document.getElementById("employeeTable");
const tableBody = table.querySelector("tbody");
const employees = [];
const trash = [];

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (name.value && role.value && status.value) {
    const employee = {
      name: name.value,
      role: role.value,
      status: status.value,
    };
    employees.push(employee);
    alert("Employee added successfully!");
  } else {
    alert("Please fill in all fields.");
  }
});

showBtn.addEventListener("click", () => {
  if (employees.length > 0) {
    tableBody.innerHTML = ""; 
    employees.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${employee.status}</td>

      `;
      tableBody.appendChild(row);
    });
  } else {
    alert("No employees to show.");
  }
}
);

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const index = parseInt(prompt("Enter the index of the employee to edit:"));
  if (index >= 0 && index < employees.length) {
    const employee = employees[index];
    name.value = employee.name;
    role.value = employee.role;
    status.value = employee.status;
    employees.splice(index, 1); 
    alert("Employee details loaded for editing.");
  } else {
    alert("Invalid index.");
  }
}
);

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const index = parseInt(prompt("Enter the index of the employee to delete:"));
  if (index >= 0 && index < employees.length) {
    // Move employee to trash
    const [deleted] = employees.splice(index, 1);
    trash.push(deleted);
    tableBody.innerHTML = "";
    employees.forEach((employee, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${employee.status}</td>

      `;
      tableBody.appendChild(row);
    });
    alert("Employee deleted and moved to trash.");
  } else {
    alert("Invalid index.");
  }
});

restoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (trash.length === 0) {
    alert("Trash is empty.");
    return;
  }
  let msg = "Employees in Trash:\n";
  trash.forEach((emp, idx) => {
    msg += `${idx}: ${emp.name} (${emp.role})\n`;
  });
  const index = parseInt(prompt(msg + "Enter the index of the employee to restore:"));
  if (index >= 0 && index < trash.length) {
    const restored = trash.splice(index, 1)[0];
    employees.push(restored);
    alert("Employee restored successfully.");
  } else {
    alert("Invalid index.");
  }
});
