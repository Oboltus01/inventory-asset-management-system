const API_URL = "http://localhost:8001/api";

const result = document.getElementById("result");

async function getData(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
}

function showJson(data) {
    result.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`;
}

function renderTable(title, columns, rows) {
    let html = `<h2>${title}</h2>`;
    html += "<table>";
    html += "<thead><tr>";

    for (const column of columns) {
        html += `<th>${column.label}</th>`;
    }

    html += "</tr></thead><tbody>";

    for (const row of rows) {
        html += "<tr>";

        for (const column of columns) {
            const value = row[column.key] ?? "";

            if (column.key === "status") {
                html += `<td><span class="status status-${value}">${value}</span></td>`;
            } else {
                html += `<td>${value}</td>`;
            }
        }

        html += "</tr>";
    }

    html += "</tbody></table>";
    result.innerHTML = html;
}

async function loadHealth() {
    const data = await getData("health");
    showJson(data);
}

async function loadAssets() {
    const data = await getData("assets");

    renderTable(
        "Assets",
        [
            { key: "id", label: "ID" },
            { key: "name", label: "Asset Name" },
            { key: "category_name", label: "Category" },
            { key: "employee_name", label: "Assigned To" },
            { key: "status", label: "Status" }
        ],
        data.items
    );
}

async function loadEmployees() {
    const data = await getData("employees");

    renderTable(
        "Employees",
        [
            { key: "id", label: "ID" },
            { key: "full_name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "department", label: "Department" },
            { key: "position", label: "Position" }
        ],
        data.items
    );
}

async function loadProcurement() {
    const data = await getData("procurement");

    renderTable(
        "Procurement Requests",
        [
            { key: "id", label: "ID" },
            { key: "employee_name", label: "Employee" },
            { key: "category_name", label: "Category" },
            { key: "item_name", label: "Item" },
            { key: "status", label: "Status" }
        ],
        data.items
    );
}

async function loadReport() {
    const data = await getData("reports");

    const report = data.report;

    result.innerHTML = `
        <h2>System Summary</h2>

        <div class="report-card">
            <p><strong>Total Assets:</strong> ${report.total_assets}</p>
            <p><strong>Total Employees:</strong> ${report.total_employees}</p>
            <p><strong>Total Requests:</strong> ${report.total_procurement_requests}</p>
            <p><strong>Assigned Assets:</strong> ${report.assigned_assets}</p>
            <p><strong>Available Assets:</strong> ${report.available_assets}</p>
        </div>
    `;
}

async function createAsset() {
    const name = document.getElementById("asset_name").value;
    const categoryId = document.getElementById("category_id").value;
    const employeeId = document.getElementById("employee_id").value;
    const status = document.getElementById("asset_status").value;

    const assetData = {
        name: name,
        category_id: Number(categoryId),
        employee_id: employeeId ? Number(employeeId) : null,
        status: status
    };

    const response = await fetch(`${API_URL}/assets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assetData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        result.textContent = `Error: ${data.error || "Asset was not created"}`;
        return;
    }

    document.getElementById("asset_name").value = "";
    document.getElementById("category_id").value = "";
    document.getElementById("employee_id").value = "";

    await loadAssets();
}