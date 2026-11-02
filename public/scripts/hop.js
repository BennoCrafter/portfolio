// Splits big .name headings into letters that hop on hover (and on tap, since touch has no hover)
document.querySelectorAll(".name").forEach((heading) => {
    const text = heading.textContent.trim();
    heading.setAttribute("aria-label", text);
    heading.textContent = "";

    [...text].forEach((char) => {
        const letter = document.createElement("span");
        letter.setAttribute("aria-hidden", "true");
        letter.textContent = char;
        letter.addEventListener("pointerdown", () => {
            letter.classList.add("hop");
            setTimeout(() => letter.classList.remove("hop"), 350);
        });
        heading.appendChild(letter);
    });
});
