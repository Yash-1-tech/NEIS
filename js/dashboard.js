document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});

function loadDashboard() {
    fetch("mock/eligibility.json")
        .then(res => res.json())
        .then(data => renderDashboard(data))
        .catch(err => console.error(err));
}

function renderDashboard(data) {
    document.getElementById("greeting").innerText =
        `Welcome, ${data.user.state} Citizen`;

    document.getElementById("eligibleCount").innerText =
        data.summary.eligible;

    document.getElementById("needDocsCount").innerText =
        data.summary.needDocuments;

    document.getElementById("notEligibleCount").innerText =
        data.summary.notEligible;

    const list = document.getElementById("schemeList");
    list.innerHTML = "";

    data.schemes.forEach(scheme => {
        const div = document.createElement("div");
        div.className = "scheme-card";

        let statusText = "";
        let actionButton = "";

        if (scheme.status === "eligible") {
            statusText = "🟢 Eligible";
            actionButton = `<button>Proceed</button>`;
        } else if (scheme.status === "need_documents") {
            statusText = "🟠 Documents Required";
            actionButton = `<button>Upload Missing Document</button>`;
        }

        div.innerHTML = `
            <h3>${scheme.name}</h3>
            <p>${scheme.benefit}</p>
            <p><strong>${statusText}</strong></p>
            ${actionButton}
        `;

        list.appendChild(div);
    });
}

