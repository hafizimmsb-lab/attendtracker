
let attendanceData = [];
let employeeDatabase = [];

// Load the JSON database
fetch('app_database.json')
  .then(response => response.json())
  .then(data => {
    employeeDatabase = data;
    console.log("Employee database loaded:", employeeDatabase);
  });

// Add entry to table
function addToAttendanceTable(entry) {
  const tbody = document.getElementById("attendanceBody");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${entry.HID}</td><td>${entry["Employee ID"]}</td><td>${entry["Full Name"]}</td>`;
  tbody.appendChild(row);
  attendanceData.push(entry);
}

// Simulate badge scan
document.getElementById("startScan").addEventListener("click", () => {
  const scannedHID = prompt("Scan HID badge or enter HID manually:");
  const match = employeeDatabase.find(emp => String(emp.HID) === scannedHID);

  if (match) {
    addToAttendanceTable(match);
  } else {
    alert("No match found for HID: " + scannedHID);
  }
});

// Undo last entry
document.getElementById("undo").addEventListener("click", () => {
  attendanceData.pop();
  const tbody = document.getElementById("attendanceBody");
  tbody.removeChild(tbody.lastChild);
});

// Manual input
document.getElementById("manualInput").addEventListener("click", () => {
  const hid = prompt("Enter HID:");
  const empId = prompt("Enter Employee ID:");
  const fullName = prompt("Enter Full Name:");
  if (hid && empId && fullName) {
    addToAttendanceTable({ HID: hid, "Employee ID": empId, "Full Name": fullName });
  }
});

// Export to CSV
document.getElementById("export").addEventListener("click", () => {
  let csvContent = "data:text/csv;charset=utf-8,HID,Employee ID,Full Name\n";
  attendanceData.forEach(row => {
    csvContent += `${row.HID},${row["Employee ID"]},${row["Full Name"]}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "attendance.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Refresh
document.getElementById("refresh").addEventListener("click", () => {
  location.reload();
});

// Print
document.getElementById("print").addEventListener("click", () => {
  window.print();
});
