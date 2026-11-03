const socialConfig = [
  {
    name: "Discord",
    icon: "/assets/socials/discord.svg",
    link: "https://discord.com/users/bennowo",
  },
  {
    name: "github",
    icon: "/assets/socials/github.svg",
    link: "https://github.com/BennoCrafter",
  },
  {
    name: "Ko-fi",
    icon: "/assets/socials/kofi.svg",
    link: "https://ko-fi.com/bennowo",
  },
];

const socialsContainer = document.getElementById("socials-container");

socialConfig.forEach((social) => {
  const button = document.createElement("a");
  button.classList.add("social-button");
  button.href = social.link;
  button.target = "_blank";
  button.rel = "noopener noreferrer";

  const icon = document.createElement("span");
  icon.className = "social-icon";
  icon.style.maskImage = `url(${social.icon})`;
  icon.style.webkitMaskImage = `url(${social.icon})`;
  button.setAttribute("aria-label", social.name);

  button.appendChild(icon);

  socialsContainer.appendChild(button);
});
