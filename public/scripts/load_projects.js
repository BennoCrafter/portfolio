const PLACEHOLDER_IMG =
    "data:image/svg+xml," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
            '<rect width="100%" height="100%" fill="#e2d3b3"/>' +
            '<rect x="8" y="8" width="384" height="284" fill="none" stroke="#2b2420" stroke-width="3" stroke-dasharray="10 6"/>' +
            '<text x="50%" y="52%" font-family="Georgia, serif" font-size="22" fill="#2b2420" text-anchor="middle">NO PHOTO</text>' +
            '<text x="50%" y="64%" font-family="Georgia, serif" font-size="13" fill="#5c4f42" text-anchor="middle">on file</text>' +
            "</svg>",
    );

async function loadProjects() {
    try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        const projectsGrid = document.querySelector(".projects-grid");

        projectsGrid.innerHTML = "";

        data.projects.forEach((project) => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const hasLive = Boolean(project.links.live);
    const linkIcon = `<svg class="external-link-icon" viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7v2H5v14h14v-6h2zm3-8h-6V3h6v2z"/>
    </svg>`;

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}"${project.imageFit ? ` style="object-fit:${project.imageFit}"` : ""} alt="${project.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'">
        </div>
        <div class="project-content">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
            </div>
            <div class="project-links">
                ${hasLive ? `<a href="${project.links.live}" class="project-link" target="_blank" rel="noopener noreferrer">Live ${linkIcon}</a>` : ""}
                <a href="${project.links.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub ${linkIcon}</a>
            </div>
        </div>
    `;

    return card;
}

// Click a project image to show it enlarged
document.addEventListener("click", (e) => {
    const img = e.target.closest(".project-image img");
    if (!img) return;
    const lightbox = document.querySelector(".lightbox");
    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("img").alt = img.alt;
    lightbox.showModal();
});

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);
