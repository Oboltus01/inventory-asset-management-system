const API_URL = "http://localhost:8001/api";

const result = document.getElementById("result");

document.addEventListener("DOMContentLoaded", () => {
    loadFormOptions();
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

function fillSelect(selectId, defaultText, items, textKey) {
    const select = document.getElementById(selectId);

    if (!select) {
        return;
    }

    select.innerHTML = "";
    select.appendChild(new Option(defaultText, ""));

    for (const item of items) {
        select.appendChild(
            new Option(item[textKey], item.id)
        );
    }
}

async function loadFormOptions() {
    const assetMessage = document.getElementById("asset_form_message");
    const procurementMessage = document.getElementById("procurement_form_message");

    try {
        const categoriesData = await getData("categories");
        const employeesData = await getData("employees");

        fillSelect("category_id", "Select Category", categoriesData.items, "name");
        fillSelect("employee_id", "Not assigned", employeesData.items, "full_name");

        fillSelect("procurement_category_id", "Select Category", categoriesData.items, "name");
        fillSelect("procurement_employee_id", "Select Employee", employeesData.items, "full_name");

        if (assetMessage) {
            assetMessage.textContent = "";
        }

        if (procurementMessage) {
            procurementMessage.textContent = "";
        }

    } catch (error) {
        if (assetMessage) {
            assetMessage.textContent = "Could not load categories or employees";
        }

        if (procurementMessage) {
            procurementMessage.textContent = "Could not load categories or employees";
        }
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
            { key: "reason", label: "Reason" },
            { key: "status", label: "Status" }
        ],
        data.items
    );
}

async function loadReport() {
    const data = await getData("reports");

    const report = data.report;

    result.innerHTML = `
        <h2>System Dashboard</h2>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Total Assets</h3>
                <p>${escapeHtml(report.total_assets)}</p>
            </div>

            <div class="dashboard-card">
                <h3>Total Employees</h3>
                <p>${escapeHtml(report.total_employees)}</p>
            </div>

            <div class="dashboard-card">
                <h3>Total Requests</h3>
                <p>${escapeHtml(report.total_procurement_requests)}</p>
            </div>

            <div class="dashboard-card">
                <h3>Assigned Assets</h3>
                <p>${escapeHtml(report.assigned_assets)}</p>
            </div>

            <div class="dashboard-card">
                <h3>Available Assets</h3>
                <p>${escapeHtml(report.available_assets)}</p>
            </div>
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

    try {
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

    } catch (error) {
        message.textContent = "Error: backend is not available";
    }
}

function resetAssetForm() {
    document.getElementById("asset_form").reset();
    document.getElementById("asset_form_message").textContent = "";
}

async function createEmployee(event) {
    event.preventDefault();

    const message = document.getElementById("employee_form_message");

    const fullName = document.getElementById("employee_full_name").value.trim();
    const email = document.getElementById("employee_email").value.trim();
    const department = document.getElementById("employee_department").value.trim();
    const position = document.getElementById("employee_position").value.trim();

    if (!fullName || !email) {
        message.textContent = "Full name and email are required";
        return;
    }

    const employeeData = {
        full_name: fullName,
        email: email,
        department: department || null,
        position: position || null
    };

    try {
        const response = await fetch(`${API_URL}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            message.textContent = `Error: ${data.error || "Employee was not created"}`;
            return;
        }

        resetEmployeeForm();

        message.textContent = "Employee created successfully";

        await loadEmployees();
        await loadFormOptions();

    } catch (error) {
        message.textContent = "Error: backend is not available";
    }
}

function resetEmployeeForm() {
    document.getElementById("employee_form").reset();
    document.getElementById("employee_form_message").textContent = "";
}

async function createProcurement(event) {
    event.preventDefault();

    const message = document.getElementById("procurement_form_message");

    const employeeId = document.getElementById("procurement_employee_id").value;
    const categoryId = document.getElementById("procurement_category_id").value;
    const itemName = document.getElementById("procurement_item_name").value.trim();
    const reason = document.getElementById("procurement_reason").value.trim();
    const status = document.getElementById("procurement_status").value;

    if (!employeeId || !categoryId || !itemName) {
        message.textContent = "Employee, category and item name are required";
        return;
    }

    const procurementData = {
        employee_id: Number(employeeId),
        category_id: Number(categoryId),
        item_name: itemName,
        reason: reason || null,
        status: status
    };

    try {
        const response = await fetch(`${API_URL}/procurement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(procurementData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            message.textContent = `Error: ${data.error || "Procurement request was not created"}`;
            return;
        }

        resetProcurementForm();

        message.textContent = "Procurement request created successfully";

        await loadProcurement();

    } catch (error) {
        message.textContent = "Error: backend is not available";
    }
}

function resetProcurementForm() {
    document.getElementById("procurement_form").reset();
    document.getElementById("procurement_form_message").textContent = "";
}