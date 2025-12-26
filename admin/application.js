document.addEventListener("DOMContentLoaded", () => {
    loadApplication();
});

function loadApplication() {
    fetch("mock/application-detail.json")
        .then(res => res.json())
        .then(data => renderApplication(data));
}

function renderApplication(data) {
    document.getElementById("appId").innerText =
        `Application ID: ${data.applicationId}`;

    document.getElementById("state").innerText =
        data.applicant.state;

    document.getElementById("income").innerText =
        data.applicant.incomeCategory;

    document.getElementById("family").innerText =
        data.applicant.familyType;

    document.getElementById("scheme").innerText =
        `${data.scheme.name} – ${data.scheme.benefit}`;

    const docs = document.getElementById("documents");
    docs.innerHTML = "";

    data.documents.forEach(doc => {
        const li = document.createElement("li");
        li.innerText =
            `${doc.type}: ${formatDocStatus(doc.status)}`;
        docs.appendChild(li);
    });

    document.getElementById("risk").innerHTML =
        formatRisk(data.risk);

    document.getElementById("submitted").innerText =
        data.submittedOn;
}

function formatDocStatus(status) {
    if (status === "VERIFIED") return "🟢 Verified";
    if (status === "MISSING") return "🟠 Missing";
    return "🔴 Issue";
}

function formatRisk(risk) {
    if (risk.level === "HIGH_RISK") {
        return `🔴 High Risk – ${risk.reason}`;
    }
    if (risk.level === "FLAGGED") {
        return `🟠 Flagged – ${risk.reason}`;
    }
    return "🟢 No risk detected";
}

function goBack() {
    window.location.href = "admin.html";
}
