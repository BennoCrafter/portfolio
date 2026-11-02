// Loaded in <head> so the saved theme applies before first paint.
const themes = [
    { name: "moss", color: "linear-gradient(135deg, #e3e9d6, #5f7a52)" },
    { name: "apricot", color: "linear-gradient(135deg, #ffe3cc, #ee7d52)" },
    { name: "dusk", color: "linear-gradient(135deg, #8d99ae, #23253a)" },
];

function savedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch {
        return null;
    }
}

function applyTheme(name) {
    document.documentElement.dataset.theme = name;
    try {
        localStorage.setItem("theme", name);
    } catch {}
    document.querySelectorAll(".theme-dot").forEach((dot) => {
        dot.setAttribute("aria-pressed", dot.dataset.theme === name);
    });
}

if (savedTheme()) document.documentElement.dataset.theme = savedTheme();

document.addEventListener("DOMContentLoaded", () => {
    // Without a saved choice, highlight whichever theme the system picked
    const current =
        savedTheme() || (matchMedia("(prefers-color-scheme: dark)").matches ? "dusk" : "moss");

    const item = document.createElement("li");
    item.className = "theme-dots";
    themes.forEach((theme) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "theme-dot";
        dot.dataset.theme = theme.name;
        dot.style.background = theme.color;
        dot.setAttribute("aria-label", `${theme.name} theme`);
        dot.setAttribute("aria-pressed", theme.name === current);
        dot.addEventListener("click", () => applyTheme(theme.name));
        item.appendChild(dot);
    });
    document.querySelector("nav ul").appendChild(item);
});
