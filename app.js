// ============================================================
// PORTFOLIO APP — Main Application Controller
// ============================================================

(function () {
  "use strict";

  const DATA = PORTFOLIO_DATA;

  // ── Helpers ─────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function showToast(message, icon = "✅") {
    const toast = $("#toast");
    const toastText = $("#toast-text");
    const toastIcon = toast.querySelector(".toast-icon");
    toastText.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2500);
  }

  // ── Theme Toggle ────────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem("portfolio-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon(saved);

    $("#theme-toggle").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    $("#theme-toggle").textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // ── Navigation ──────────────────────────────────────────────
  function initNavigation() {
    const navLinksContainer = $("#nav-links");
    DATA.navLinks.forEach((link) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${link.href}">${link.label}</a>`;
      navLinksContainer.appendChild(li);
    });

    // Scroll effect
    window.addEventListener("scroll", () => {
      const navbar = $("#navbar");
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Active link on scroll (IntersectionObserver)
    const sections = $$("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            $$(".nav-links a").forEach((a) => a.classList.remove("active"));
            const activeLink =
              $(`.nav-links a[href="#${id}"]`) ||
              $(`.nav-links a[href="#hero"]`);
            if (activeLink) activeLink.classList.add("active");
          }
        });
      },
      { threshold: 0.3, rootMargin: "-70px 0px 0px 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));

    // Mobile menu
    const mobileBtn = $("#mobile-menu-btn");
    mobileBtn.addEventListener("click", () => {
      navLinksContainer.classList.toggle("mobile-open");
    });
    // Close mobile menu on link click
    navLinksContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinksContainer.classList.remove("mobile-open");
      }
    });
  }

  // ── Hero ────────────────────────────────────────────────────
  function initHero() {
    $("#hero-name").textContent = DATA.profile.name;
    $("#hero-title").textContent = `${DATA.profile.title} — ${DATA.profile.tagline}`;
    if (DATA.profile.resumeLink) {
      $("#resume-btn").href = DATA.profile.resumeLink;
    }
  }

  // ── Working Status ──────────────────────────────────────────
  let currentMode = DATA.workingStatus.currentMode;

  function initWorkingStatus() {
    // Mode switcher buttons
    const switcher = $("#status-switcher");
    Object.entries(DATA.workingStatus.modes).forEach(([key, mode]) => {
      const btn = document.createElement("button");
      btn.className = `mode-btn ${key === currentMode ? "active" : ""}`;
      btn.textContent = mode.label;
      btn.dataset.mode = key;
      btn.addEventListener("click", () => setStatusMode(key));
      switcher.appendChild(btn);
    });

    // Status details
    const details = $("#status-details");
    const rows = [
      { icon: "🎯", label: "Current Focus", value: DATA.workingStatus.currentFocus },
      { icon: "⚡", label: "Response Time", value: DATA.workingStatus.responseTime },
      { icon: "📍", label: "Location", value: DATA.profile.location },
    ];
    rows.forEach((row) => {
      const div = document.createElement("div");
      div.className = "status-row";
      div.innerHTML = `
        <div class="status-row-icon">${row.icon}</div>
        <div>
          <div class="status-row-label">${row.label}</div>
          <div class="status-row-value">${row.value}</div>
        </div>
      `;
      details.appendChild(div);
    });

    // Clock & timezone
    $("#timezone-label").textContent = DATA.profile.timezoneLabel;
    $("#working-hours").textContent = DATA.workingStatus.workingHours;
    $("#preferred-contact").textContent = DATA.workingStatus.preferredContact;

    updateStatusUI();
    updateClock();
    setInterval(updateClock, 1000);
  }

  function setStatusMode(mode) {
    currentMode = mode;
    $$(".mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === mode);
    });
    updateStatusUI();
  }

  function updateStatusUI() {
    const mode = DATA.workingStatus.modes[currentMode];
    const badge = $("#status-badge");
    badge.className = `status-badge ${currentMode}`;
    $("#status-label").textContent = mode.label;
    $("#status-description").textContent = mode.description;

    // Nav pill
    const navPill = $("#nav-status-pill");
    const navText = $("#nav-status-text");
    navText.textContent = mode.label;
    const pulse = navPill.querySelector(".pulse");
    if (currentMode === "available") {
      pulse.style.background = "var(--color-success)";
    } else if (currentMode === "busy") {
      pulse.style.background = "var(--color-danger)";
    } else {
      pulse.style.background = "var(--color-warning)";
    }
  }

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: DATA.profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
    $("#live-clock").textContent = timeStr;
  }

  // ── About ───────────────────────────────────────────────────
  function initAbout() {
    $("#about-bio").textContent = DATA.profile.bio;
  }

  // ── Skills ──────────────────────────────────────────────────
  function initSkills() {
    const grid = $("#skills-grid");
    DATA.skills.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "glass-card skill-category reveal";
      card.innerHTML = `
        <div class="skill-category-header">
          <span class="skill-category-icon">${cat.icon}</span>
          <span class="skill-category-name">${cat.category}</span>
        </div>
        <div class="skill-pills">
          ${cat.items.map((s) => `<span class="skill-pill">${s}</span>`).join("")}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ── Projects ────────────────────────────────────────────────
  let activeFilter = "all";

  function initProjects() {
    // Filters
    const filtersContainer = $("#project-filters");
    DATA.projectCategories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = `filter-btn ${cat.key === "all" ? "active" : ""}`;
      btn.textContent = cat.label;
      btn.dataset.filter = cat.key;
      btn.addEventListener("click", () => filterProjects(cat.key));
      filtersContainer.appendChild(btn);
    });

    renderProjects();
  }

  function filterProjects(key) {
    activeFilter = key;
    $$(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === key);
    });
    renderProjects();
  }

  function renderProjects() {
    const grid = $("#projects-grid");
    grid.innerHTML = "";

    const filtered =
      activeFilter === "all"
        ? DATA.projects
        : DATA.projects.filter((p) => p.category === activeFilter);

    filtered.forEach((project, idx) => {
      const card = document.createElement("div");
      card.className = "glass-card project-card reveal";
      card.style.animationDelay = `${idx * 0.1}s`;

      const imageHTML = project.image
        ? `<img class="project-card-image" src="${project.image}" alt="${project.title}" />`
        : `<div class="project-card-placeholder">🚀</div>`;

      const metricsHTML = project.metrics
        ? `<div class="project-metrics">
            ${Object.entries(project.metrics)
              .map(
                ([key, val]) => `
              <div class="project-metric">
                <div class="project-metric-value">${val}</div>
                <div class="project-metric-label">${key}</div>
              </div>`
              )
              .join("")}
           </div>`
        : "";

      card.innerHTML = `
        ${imageHTML}
        <div class="project-card-body">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-subtitle">${project.subtitle}</p>
          <p class="project-card-desc">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
          </div>
          ${metricsHTML}
        </div>
        <div class="project-card-actions">
          <button class="btn btn-ghost btn-detail" data-id="${project.id}">
            <span>🔍</span> Details
          </button>
          <a href="${project.liveUrl}" class="btn btn-ghost" target="_blank">
            <span>🔗</span> Live
          </a>
          <a href="${project.githubUrl}" class="btn btn-ghost" target="_blank">
            <span>📂</span> Code
          </a>
        </div>
      `;

      card.querySelector(".btn-detail").addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectModal(project);
      });

      grid.appendChild(card);
    });

    // Re-trigger reveal for new items
    initScrollReveal();
  }

  function openProjectModal(project) {
    const modal = $("#project-modal");
    $("#modal-title").textContent = project.title;
    $("#modal-subtitle").textContent = project.subtitle;
    $("#modal-description").textContent = project.longDescription;

    const img = $("#modal-image");
    if (project.image) {
      img.src = project.image;
      img.alt = project.title;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    const tagsContainer = $("#modal-tags");
    tagsContainer.innerHTML = project.tags
      .map((t) => `<span class="project-tag">${t}</span>`)
      .join("");

    const metricsContainer = $("#modal-metrics");
    metricsContainer.innerHTML = project.metrics
      ? Object.entries(project.metrics)
          .map(
            ([key, val]) => `
          <div class="project-metric">
            <div class="project-metric-value">${val}</div>
            <div class="project-metric-label">${key}</div>
          </div>`
          )
          .join("")
      : "";

    $("#modal-live-link").href = project.liveUrl;
    $("#modal-github-link").href = project.githubUrl;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    const modal = $("#project-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // ── Experience ──────────────────────────────────────────────
  function initExperience() {
    const timeline = $("#timeline");
    DATA.experience.forEach((exp) => {
      const item = document.createElement("div");
      item.className = `timeline-item ${exp.current ? "current" : ""} reveal`;
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="glass-card timeline-card">
          <span class="timeline-type-badge ${exp.type}">
            ${exp.type === "work" ? "💼" : "🎓"} ${exp.type}
          </span>
          <div class="timeline-period">${exp.period}</div>
          <h3 class="timeline-role">${exp.role}</h3>
          <p class="timeline-org">${exp.org}</p>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      `;
      timeline.appendChild(item);
    });
  }

  // ── Contact ─────────────────────────────────────────────────
  function initContact() {
    const channels = $("#contact-channels");
    const channelData = [
      { icon: "📧", label: "Email", value: DATA.contact.email, copyable: true },
      { icon: "📞", label: "Phone", value: DATA.contact.phone, copyable: true },
      { icon: "💬", label: "Discord", value: DATA.contact.discord, copyable: true },
      { icon: "📍", label: "Location", value: DATA.contact.location, copyable: false },
    ];

    channelData.forEach((ch) => {
      const card = document.createElement("div");
      card.className = "glass-card contact-channel";
      card.innerHTML = `
        <div class="channel-icon">${ch.icon}</div>
        <div class="channel-info">
          <div class="channel-label">${ch.label}</div>
          <div class="channel-value">${ch.value}</div>
        </div>
        ${ch.copyable ? `<button class="channel-copy" data-copy="${ch.value}">Copy</button>` : ""}
      `;
      channels.appendChild(card);
    });

    // Copy buttons
    $$(".channel-copy").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(btn.dataset.copy).then(() => {
          btn.textContent = "Copied!";
          btn.classList.add("copied");
          showToast(`${btn.dataset.copy} copied to clipboard!`, "📋");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        });
      });
    });

    // Social links
    const socialContainer = $("#social-links");
    const socialIcons = {
      github: "🐙",
      linkedin: "💼",
      twitter: "🐦",
      dribbble: "🏀",
      leetcode: "🧠",
    };
    DATA.socials.forEach((social) => {
      const card = document.createElement("a");
      card.className = "glass-card social-card";
      card.href = social.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.innerHTML = `
        <span class="social-icon">${socialIcons[social.icon] || "🔗"}</span>
        <span class="social-label">${social.platform}</span>
      `;
      socialContainer.appendChild(card);
    });

    // Topic chips
    const chipsContainer = $("#topic-chips");
    let selectedTopic = "";
    DATA.contact.formTopics.forEach((topic) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "topic-chip";
      chip.textContent = topic;
      chip.addEventListener("click", () => {
        $$(".topic-chip").forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
        selectedTopic = topic;
      });
      chipsContainer.appendChild(chip);
    });

    // Contact form
    const form = $("#contact-form");
    const msgTextarea = $("#contact-message");
    const charCount = $("#char-count");

    msgTextarea.addEventListener("input", () => {
      charCount.textContent = msgTextarea.value.length;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      // Validate name
      const name = $("#contact-name");
      if (!name.value.trim()) {
        name.classList.add("error");
        $("#name-error").classList.add("visible");
        valid = false;
      } else {
        name.classList.remove("error");
        $("#name-error").classList.remove("visible");
      }

      // Validate email
      const email = $("#contact-email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add("error");
        $("#email-error").classList.add("visible");
        valid = false;
      } else {
        email.classList.remove("error");
        $("#email-error").classList.remove("visible");
      }

      // Validate message
      if (msgTextarea.value.trim().length < 10) {
        msgTextarea.classList.add("error");
        $("#message-error").classList.add("visible");
        valid = false;
      } else {
        msgTextarea.classList.remove("error");
        $("#message-error").classList.remove("visible");
      }

      if (valid) {
        const submitBtn = $("#submit-btn");
        submitBtn.innerHTML = "<span>✅</span> Message Sent!";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";

        showToast("Message sent successfully! I'll get back to you soon.", "🎉");

        setTimeout(() => {
          form.reset();
          charCount.textContent = "0";
          $$(".topic-chip").forEach((c) => c.classList.remove("selected"));
          selectedTopic = "";
          submitBtn.innerHTML = '<span>🚀</span> Send Message';
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }, 3000);
      }
    });

    // Clear errors on input
    ["contact-name", "contact-email", "contact-message"].forEach((id) => {
      $(`#${id}`).addEventListener("input", () => {
        $(`#${id}`).classList.remove("error");
        const errorId = id.replace("contact-", "") + "-error";
        $(`#${errorId}`).classList.remove("visible");
      });
    });
  }

  // ── Modal Events ────────────────────────────────────────────
  function initModal() {
    $("#modal-close").addEventListener("click", closeProjectModal);
    $("#project-modal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeProjectModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjectModal();
    });
  }

  // ── Scroll Reveal ───────────────────────────────────────────
  function initScrollReveal() {
    const reveals = $$(".reveal:not(.visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  // ── Footer Year ─────────────────────────────────────────────
  function initFooter() {
    $("#footer-year").textContent = new Date().getFullYear();
  }

  // ── Initialize ──────────────────────────────────────────────
  function init() {
    initTheme();
    initNavigation();
    initHero();
    initWorkingStatus();
    initAbout();
    initSkills();
    initProjects();
    initExperience();
    initContact();
    initModal();
    initFooter();
    initScrollReveal();
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
