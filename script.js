// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update theme toggle icon
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

// Navigation Functionality
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Section Navigation
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = link.getAttribute("data-section");

    if (targetSection) {
      showSection(targetSection);
      setActiveNavLink(link);

      // Close mobile menu if open
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Button Navigation (for hero buttons)
const heroButtons = document.querySelectorAll(".btn[data-section]");
heroButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = button.getAttribute("data-section");

    if (targetSection) {
      showSection(targetSection);
      // Update nav link as well
      const correspondingNavLink = document.querySelector(
        `.nav-link[data-section="${targetSection}"]`
      );
      if (correspondingNavLink) {
        setActiveNavLink(correspondingNavLink);
      }
    }
  });
});

function showSection(sectionId) {
  // Hide all sections
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }
}

function setActiveNavLink(activeLink) {
  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to clicked link
  activeLink.classList.add("active");
}

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Contact Form Handling
const contactForm = document.querySelector(".contact-form form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
  const message = contactForm.querySelector("textarea").value;

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  alert(
    `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`
  );

  // Reset form
  contactForm.reset();
});

// Smooth animations on scroll (for when sections become visible)
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .achievement"
  );

  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Set initial animation states
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .achievement"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Run animation check
  animateOnScroll();
});

// Run animation check when sections change
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const target = mutation.target;
      if (
        target.classList.contains("section") &&
        target.classList.contains("active")
      ) {
        setTimeout(animateOnScroll, 100);
      }
    }
  });
});

sections.forEach((section) => {
  observer.observe(section, { attributes: true });
});

document.addEventListener("DOMContentLoaded", async () => {
  const heroTitle = document.querySelector(".hero-title");
  const subtitle = document.querySelector(".hero-subtitle");
  const description = document.querySelector(".hero-description");
  const buttons = document.querySelector(".hero-buttons");
  const socialLinks = document.querySelector(".social-links");

  await typeHeroTitle(heroTitle);
  const subtitleText = "Frontend Developer";
  await sleep(300);
  await typeWriter(subtitle, subtitleText, 40);
  const descriptionText =
    "I'm Self-motivated Frontend Developer with hands-on experience in building detail-oriented, responsive, user-friendly web interfaces. Contributed to Live Production projects and collaborative development teams.";
  await sleep(300);
  await typeWriter(description, descriptionText, 20);
  await sleep(300);
  buttons.classList.add("visible");
  await sleep(300);
  socialLinks.classList.add("visible");
});

// Typing function
function typeWriter(element, text, speed) {
  return new Promise((resolve) => {
    element.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

// Special handling to type formatted title (preserve span)
function typeHeroTitle(element) {
  return new Promise((resolve) => {
    const staticText = "Hi, I'm ";
    const highlighted = "Shashi Hans";
    element.innerHTML = ""; // Clear existing

    let i = 0;
    function type() {
      if (i < staticText.length) {
        element.innerHTML += staticText.charAt(i);
        i++;
        setTimeout(type, 50);
      } else {
        // After static part, type highlighted name
        const span = document.createElement("span");
        span.className = "highlight";
        element.appendChild(span);

        let j = 0;
        function typeHighlight() {
          if (j < highlighted.length) {
            span.textContent += highlighted.charAt(j);
            j++;
            setTimeout(typeHighlight, 50);
          } else {
            resolve();
          }
        }
        typeHighlight();
      }
    }
    type();
  });
}

// Utility delay function
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

const projects = [
  {
    title: "Educational Application",
    description:
      "<b>EduVerse</b> is an educational application where everyone can explore courses, books and unlock their potential.",
    link: "https://educational-verse.netlify.app/",
    icon: "fas fa-globe",
    tech: ["React.js", "TypeScript", "CSS3"],
  },
  {
    title: "Bubbles Shooter Game",
    description:
      "Bubbles Shooter Game using Canvas JS. This project is built with: HTML5 (with inline JS and CSS).",
    link: "https://shashi-hans.github.io/bubble_shooter_game/",
    icon: "fas fa-gamepad",
    tech: ["HTML5", "JavaScript", "CSS3"],
  },
  {
    title: "URL Shortner App",
    description:
      "A simple URL shortening application built as MERN app. This project allows users to shorten long URLs and use short url for convenience.",
    link: "https://url-shortning.netlify.app/",
    icon: "fas fa-cut",
    tech: ["React", "CSS3", "HTML5", "TypeScript", "Node.js"],
  },
  {
    title: "Library Room",
    description: "Its a CRUD MERN App for maintaining Book list for a Library",
    link: "https://library-mern-crud-app.netlify.app/",
    icon: "fas fa-globe",
    tech: ["React", "CSS3", "HTML5", "TypeScript", "Node.js"],
  },
  {
    title: "Coming Soon",
    image: "images/coming-soon.jpg",
  },
];

const grid = document.getElementById("projects-grid");

projects.forEach((project) => {
  const card = document.createElement("div");
  card.className = "project-card";

  if (project.image) {
    card.innerHTML = `<img src="${project.image}" alt="Coming soon" class="coming-soon"/>`;
  } else {
    const techTags = project.tech
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    card.innerHTML = `
        <div class="project-link-container">
          <div class="project-image"><i class="${project.icon}"></i></div>
          <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i> Visit Site
          </a>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">${techTags}</div>
        </div>
      `;
  }

  grid.appendChild(card);
});

const skillsData = [
  {
    title: "Languages & Frameworks",
    items: [
      { name: "HTML5", icon: "fab fa-html5" },
      { name: "CSS3", icon: "fab fa-css3-alt" },
      { name: "JavaScript", icon: "fab fa-js-square" },
      { name: "React.js", icon: "fab fa-react" },
      { name: "Vue.js", icon: "fab fa-vuejs" },
      { name: "TypeScript", icon: "fas fa-code" },
      { name: "Bootstrap", icon: "fab fa-bootstrap" },
      { name: "Sass", icon: "fab fa-sass" },
      { name: "Tailwind", image: "images/tailwind_icon.png", alt: "Tailwind" },
      { name: "jQuery", image: "images/jquery_icon.png", alt: "jQuery" },
      { name: "Knockout", image: "images/knockout_icon.png", alt: "Knockout" },
    ],
  },
  {
    title: "Tools & Technologies",
    items: [
      { name: "Git", icon: "fab fa-git-alt" },
      { name: "GitHub", icon: "fab fa-github" },
      { name: "Jira", icon: "fas fa-tasks" },
      { name: "Node.js", icon: "fab fa-node-js" },
      { name: "MongoDB", icon: "fas fa-database" },
      { name: "PostgreSQL", icon: "fas fa-database" },
      { name: "Linux", icon: "fab fa-linux" },
      { name: "Command Line", icon: "fas fa-terminal" },
    ],
  },
  {
    title: "Concepts & Methodologies",
    items: [
      { name: "Responsive Design", icon: "fas fa-mobile-alt" },
      { name: "Redux/Flux", icon: "fas fa-code-branch" },
      { name: "RESTful API", icon: "fas fa-exchange-alt" },
      { name: "Debugging", icon: "fas fa-bug" },
      { name: "Agile", icon: "fas fa-sync-alt" },
      { name: "OOP", icon: "fas fa-object-group" },
    ],
  },
];

const container = document.getElementById("skills-content");

skillsData.forEach((category) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "skill-category";

  const heading = document.createElement("h3");
  heading.textContent = category.title;

  const grid = document.createElement("div");
  grid.className = "skills-grid";

  category.items.forEach((skill) => {
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item";

    if (skill.icon) {
      const icon = document.createElement("i");
      icon.className = skill.icon;
      skillItem.appendChild(icon);
    } else if (skill.image) {
      const img = document.createElement("img");
      img.src = skill.image;
      img.alt = skill.alt || skill.name;
      img.className = "custom-icon";
      skillItem.appendChild(img);
    }

    const span = document.createElement("span");
    span.textContent = skill.name;
    skillItem.appendChild(span);

    grid.appendChild(skillItem);
  });

  categoryDiv.appendChild(heading);
  categoryDiv.appendChild(grid);
  container.appendChild(categoryDiv);
});
