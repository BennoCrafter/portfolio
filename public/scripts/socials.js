const socialConfig = [
  {
    name: "Discord",
    icon: "/assets/socials/discord.svg",
    link: "https://discord.com/users/bennowo",
  },
  {
    name: "GitHub",
    icon: "/assets/socials/github.svg",
    link: "https://github.com/BennoCrafter",
  },
  {
    name: "Ko-fi",
    icon: "/assets/socials/kofi.svg",
    link: "https://ko-fi.com/bennowo",
  },
];

// Create social buttons dynamically
const socialsContainer = document.getElementById("socials-container");

socialConfig.forEach((social) => {
  const button = document.createElement("button");
  button.classList.add("social-button");

  const icon = document.createElement("span");
  icon.className = "social-icon";
  icon.style.maskImage = `url(${social.icon})`;
  icon.style.webkitMaskImage = `url(${social.icon})`;
  button.setAttribute("aria-label", `${social.name} Logo`);

  button.appendChild(icon);

  button.addEventListener("click", () => {
    window.open(social.link, "_blank");
  });

  socialsContainer.appendChild(button);
});
