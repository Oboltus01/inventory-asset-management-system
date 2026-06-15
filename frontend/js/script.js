const API_URL = "http://localhost:8001/api";

const result = document.getElementById("result");

document.addEventListener("DOMContentLoaded", () => {
    loadAssetFormOptions();
});

async function getData(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
}

function showJson(data) {
    result.innerHTML = `<pre>${escapeHtml(JSON.stringify(data, null, 4))}</pre>`;
}

function escapeHtml(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderTable(title, columns, rows) {
    let html = `<h2>${escapeHtml(title)}</h2>`;

    if (!rows || rows.length === 0) {
        html += "<p>No records found.</p>";
        result.innerHTML = html;
        return;
    }

    html += "<table>";
    html += "<thead><tr>";

    for (const column of columns) {
        html += `<th>${escapeHtml(column.label)}</th>`;
    }

    html += "</tr></thead><tbody>";

    for (const row of rows) {
        html += "<tr>";

        for (const column of columns) {
            const value = row[column.key] ?? "";

if (column.key === "status") {
    html += `<td><span class="status status-${escapeHtml(value)}">${escapeHtml(value)}</span></td>`;
} else {
    html += `<td>${escapeHtml(value)}</td>`;
}
        }

        html += "</tr>";
    }

    html += "</tbody></table>";
    result.innerHTML = html;
}

async function loadAssetFormOptions() {
    const message = document.getElementById("asset_form_message");

    try {
        const categoriesData = await getData("categories");
        const employeesData = await getData("employees");

        const categorySelect = document.getElementById("category_id");
        const employeeSelect = document.getElementById("employee_id");

        categorySelect.innerHTML = "";
        employeeSelect.innerHTML = "";

        categorySelect.appendChild(new Option("Select Category", ""));
        employeeSelect.appendChild(new Option("Not assigned", ""));

        for (const category of categoriesData.items) {
            categorySelect.appendChild(
                new Option(category.name, category.id)
            );
        }

        for (const employee of employeesData.items) {
            employeeSelect.appendChild(
                new Option(employee.full_name, employee.id)
            );
        }

        message.textContent = "";

    } catch (error) {
        message.textContent = "Could not load categories or employees";
    }
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
            { key: "location", label: "Location" },
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
            <p><strong>Total Assets:</strong> ${escapeHtml(report.total_assets)}</p>
            <p><strong>Total Employees:</strong> ${escapeHtml(report.total_employees)}</p>
            <p><strong>Total Requests:</strong> ${escapeHtml(report.total_procurement_requests)}</p>
            <p><strong>Assigned Assets:</strong> ${escapeHtml(report.assigned_assets)}</p>
            <p><strong>Available Assets:</strong> ${escapeHtml(report.available_assets)}</p>
        </div>
    `;
}

async function createAsset(event) {
    event.preventDefault();

    const message = document.getElementById("asset_form_message");

    const name = document.getElementById("asset_name").value.trim();
    const categoryId = document.getElementById("category_id").value;
    const employeeId = document.getElementById("employee_id").value;
    const location = document.getElementById("asset_location").value.trim();
    const status = document.getElementById("asset_status").value;

    if (!name || !categoryId) {
        message.textContent = "Asset name and category are required";
        return;
    }

    const assetData = {
        name: name,
        category_id: Number(categoryId),
        employee_id: employeeId ? Number(employeeId) : null,
        location: location || null,
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
        message.textContent = `Error: ${data.error || "Asset was not created"}`;
        return;
    }

    resetAssetForm();

    message.textContent = "Asset created successfully";

    await loadAssets();
}

function resetAssetForm() {
    document.getElementById("asset_form").reset();
    document.getElementById("asset_form_message").textContent = "";
}