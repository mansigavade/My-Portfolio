const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");
const analyzeBtn = document.getElementById("analyzeBtn");
const projectInput = document.getElementById("projectInput");
const resultBox = document.getElementById("result");

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
        });
    });
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));

const skillBars = document.querySelectorAll(".bar i");
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute("data-level") || "0";
            entry.target.style.width = `${level}%`;
        }
    });
}, { threshold: 0.4 });

skillBars.forEach((bar) => barObserver.observe(bar));

function renderResult(data) {
    resultBox.innerHTML = `
        <div class="result-grid">
            <div class="result-item"><span>Matched Project</span>${data["Matched Project"] || "N/A"}</div>
            <div class="result-item"><span>Project Type</span>${data["Project Type"] || "N/A"}</div>
            <div class="result-item"><span>Libraries</span>${data["Libraries"] || "N/A"}</div>
            <div class="result-item"><span>Model Training</span>${data["Model Training"] || "N/A"}</div>
            <div class="result-item"><span>Deployment</span>${data["Deployment"] || "N/A"}</div>
            <div class="result-item"><span>Summary</span>${data["Summary"] || "N/A"}</div>
        </div>
    `;
}

async function analyzeProject() {
    const text = projectInput.value.trim();

    if (!text) {
        resultBox.textContent = "Please enter a project description first.";
        return;
    }

    resultBox.textContent = "Analyzing...";

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        renderResult(data);
    } catch (error) {
        resultBox.textContent = "Unable to analyze the project right now.";
    }
}

if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeProject);
}

if (projectInput) {
    projectInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            analyzeProject();
        }
    });
}
