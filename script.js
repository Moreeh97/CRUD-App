const name = document.getElementById("name");
const role = document.getElementById("role");
const salary = document.getElementById("salary");
const status = document.getElementById("status");

const btn = document.getElementById("btn");

const showBtn = document.getElementById("show");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const restoreBtn = document.getElementById("restore");
const addBonusBtn = document.getElementById("addBonus");
const filterActiveBtn = document.getElementById("filterActive");
const filterLeaveBtn = document.getElementById("filterLeave");
const filterTerminatedBtn = document.getElementById("filterTerminated");
const clearFiltersBtn = document.getElementById("clearFilters");
const filterByNameBtn = document.getElementById("filterByName");
const filterBySalaryBtn = document.getElementById("filterBySalary");
const filterByRoleBtn = document.getElementById("filterByRole");
const totalSalaryOfEmployeesBtn = document.getElementById("totalSalaryOfEmployees");


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
      salary: salary.value ? parseFloat(salary.value) : 0,
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
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>   
      
      `;
      tableBody.appendChild(row);
    });
  } else {
    alert("No employees to show.");
  }
}
);

// Update the counter display
updateCounter();


editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const index = parseInt(prompt("Enter the index of the employee to edit:"));
  if (index >= 0 && index < employees.length) {
    const employee = employees[index];
    name.value = employee.name;
    role.value = employee.role;
    salary.value = employee.salary ? employee.salary.toString() : "";
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
        <td>${employee.salary}</td>
        <td><button class="bonus-btn">Bonus</button></td>

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


const refreshBtn = document.getElementById("refresh");
refreshBtn.addEventListener("click", () => {
  tableBody.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
  alert("Table refreshed.");
});

const bonusButtons = document.querySelectorAll(".bonus-btn");
bonusButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const employee = employees[index];
    if (employee) {
      const bonus = parseFloat(prompt(`Enter bonus for ${employee.name}:`));
      if (!isNaN(bonus)) {
        employee.salary += bonus;
        alert(`Bonus of ${bonus} added to ${employee.name}'s salary.`);
      } else {
        alert("Invalid bonus amount.");
      }
    } else {
      alert("Employee not found.");
    }
  });
});


function updateCounter() {
  counter.textContent = `Total Employees: ${employees.length}`;
  if (employees.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='5'>No employees found.</td></tr>";
  } else {      
    tableBody.innerHTML = ""; 
    employees.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${employee.salary}</td>
        <td>${employee.status}</td>
        <td><button class="bonus-btn">Bonus</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
} 

console.log("Script loaded successfully.");
updateCounter();


const bonus = document.querySelectorAll(".bonus-btn");
bonusButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const employee = employees[index];
    if (employee) {
      const bonus = parseFloat(prompt(`Enter bonus for ${employee.name}:`));
      if (!isNaN(bonus)) {
        employee.salary += bonus;
        alert(`Bonus of ${bonus} added to ${employee.name}'s salary.`);
      } else {
        alert("Invalid bonus amount.");
      }
    } else {
      alert("Employee not found.");
    }
  });
});

addBonusBtn.addEventListener("click", () => {
  const bonus = parseFloat(prompt("Enter bonus amount:"));
  if (!isNaN(bonus)) {
    employees.forEach((employee) => {
      employee.salary += bonus;
    });
    alert(`Bonus of ${bonus} added to all employees' salaries.`);
    refreshBtn.click(); // Refresh the table to show updated salaries
  } else {
    alert("Invalid bonus amount.");
  }
});


filterActiveBtn.addEventListener("click", () => {
  const filtered = employees.filter(emp => emp.status === "Active");
  tableBody.innerHTML = "";
  filtered.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});

filterLeaveBtn.addEventListener("click", () => {
  const filtered = employees.filter(emp => emp.status === "Leave");
  tableBody.innerHTML = "";
  filtered.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});

filterTerminatedBtn.addEventListener("click", () => {
  const filtered = employees.filter(emp => emp.status === "Terminated");
  tableBody.innerHTML = "";
  filtered.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});

clearFiltersBtn.addEventListener("click", () => {
  tableBody.innerHTML = "";
  employees.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});


totalSalaryOfEmployeesBtn.addEventListener("click", () => {
  const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  alert(`Total Salary of Employees: ${totalSalary}`);
});

filterByNameBtn.addEventListener("click", () => {
  const name = prompt("Enter the name of the employee to filter by: ");
  const filtered = employees.filter(emp => emp.name.toLowerCase().includes(name.toLowerCase()));
  tableBody.innerHTML = "";
  filtered.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});

filterBySalaryBtn.addEventListener("click", () => {
  const salary = parseFloat(prompt("Enter the minimum salary to filter by: "));
  if (!isNaN(salary)) {
    const filtered = employees.filter(emp => emp.salary >= salary);
    tableBody.innerHTML = "";
    filtered.forEach(employee => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${employee.salary}</td>
        <td>${employee.status}</td>
        <td><button class="bonus-btn">Bonus</button></td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    alert("Invalid salary amount.");
  }
});

filterByRoleBtn.addEventListener("click", () => {
  const role = prompt("Enter the role to filter by: ");
  const filtered = employees.filter(emp => emp.role.toLowerCase().includes(role.toLowerCase()));
  tableBody.innerHTML = "";
  filtered.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.salary}</td>
      <td>${employee.status}</td>
      <td><button class="bonus-btn">Bonus</button></td>
    `;
    tableBody.appendChild(row);
  });
});


