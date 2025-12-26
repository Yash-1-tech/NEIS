let translations = {};
let currentLang = localStorage.getItem("lang") || "en";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("langSelect").value = currentLang;
    loadLanguage(currentLang);
    loadDashboard();
});

/* ---------- Language ---------- */

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
}

function loadLanguage(lang) {
    fetch(`i18n/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            translations = data;
            applyTranslations();
        });
}

function applyTranslations() {
    document.getElementById("eligibleLabel").innerText = translations.eligible;
    document.getElementById("needDocsLabel").innerText = translations.needDocs;
    document.getElementById("notEligibleLabel").innerText = translations.notEligible;
    document.getElementById("schemesTitle").innerText = translations.schemesTitle;
}

/* ---------- Dashboard Data ---------- */

function loadDashboard() {
    fetch("mock/eligibility.json")
        .then(res => res.json())
        .then(data => renderDashboard(data));
}

function renderDashboard(data) {
    document.getElementById("greeting").innerText =
        `${translations.welcome}, ${data.user.state}`;

    document.getElementById("eligibleCount").innerText = data.summary.eligible;
    document.getElementById("needDocsCount").innerText = data.summary.needDocuments;
    document.getElementById("notEligibleCount").innerText = data.summary.notEligible;

    const list = document.getElementById("schemeList");
    list.innerHTML = "";

    data.schemes.forEach(scheme => {
        const div = document.createElement("div");
        div.className = "scheme-card";

        let badge = "";
        let button = "";

        if (scheme.status === "eligible") {
            badge = `🟢 ${translations.eligibleBadge}`;
            button = `<button>${translations.proceedBtn}</button>`;
        } else {
            badge = `🟠 ${translations.needDocsBadge}`;
            button = `<button>${translations.uploadBtn}</button>`;
        }

        div.innerHTML = `
            <h3>${scheme.name}</h3>
            <p>${scheme.benefit}</p>
            <p><strong>${badge}</strong></p>
            ${button}
        `;

        list.appendChild(div);
    });
}
