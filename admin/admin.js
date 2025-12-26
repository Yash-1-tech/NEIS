document.addEventListener("DOMContentLoaded", () => {
    loadAdminDashboard();
});

function loadAdminDashboard() {
    fetch("mock/applications.json")
        .then(res => res.json())
        .then(data => renderAdmin(data));
}

function renderAdmin(data) {
    document.getElementById("eligibleCount").innerText =
        data.summary.eligible;

    document.getElementById("flaggedCount").innerText =
        data.summary.flagged;

    document.getElementById("highRiskCount").innerText =
        data.summary.highRisk;

    const table = document.getElementById("appTable");
    table.innerHTML = "";

    data.applications.forEach(app => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
              <a href="application.html?id=${app.id}">
                ${app.id}
              </a>
            </td>
            <td>${app.state}</td>
            <td>${app.scheme}</td>
            <td class="status-${app.status}">
                ${formatStatus(app.status)}
            </td>
            <td>${app.submittedOn}</td>
        `;

        table.appendChild(row);
    });
}

function formatStatus(status) {
    if (status === "HIGH_RISK") return "🔴 High Risk";
    if (status === "FLAGGED") return "🟠 Flagged";
    return "🟢 Eligible";
}
