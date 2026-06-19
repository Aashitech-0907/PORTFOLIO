// Aashi Garg Portfolio Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initScrollAnimations();
  initContactForm();
});

// 1. Sticky Navbar & Active Section Link Highlight
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Change navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy active navigation link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - varNavHeight()) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  function varNavHeight() {
    return navbar.clientHeight || 80;
  }

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
    menuToggle.classList.toggle('open');
    if (menuToggle.classList.contains('open')) {
      menuToggle.children[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      menuToggle.children[1].style.opacity = '0';
      menuToggle.children[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      menuToggle.children[0].style.transform = 'none';
      menuToggle.children[1].style.opacity = '1';
      menuToggle.children[2].style.transform = 'none';
    }
  });

  // Close menu on click of nav link on mobile
  navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
      menuToggle.children[0].style.transform = 'none';
      menuToggle.children[1].style.opacity = '1';
      menuToggle.children[2].style.transform = 'none';
    });
  });
}

// 2. Typing effect in Hero Section
function initTypingEffect() {
  const words = ["Responsive Web Apps", "Interactive User Interfaces", "MERN Stack Solutions", "Scalable Projects"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextEl = document.getElementById('typed-text');
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // speed up deleting
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120; // typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing
  if (typedTextEl) {
    type();
  }
}

// 3. Scroll Reveal & Skill Bar Animation
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger skill bars loading specifically
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  }
}

// 4. Modal Project Details
const projectsData = {
  library: {
    title: "Online Library Management System",
    metrics: "Optimized client-side workflows resulting in a 40% reduction in manual record-keeping time.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Node.js", "Express.js", "MongoDB", "MERN Stack"],
    features: [
      "Secure user registration and authentication protocols (JWT).",
      "Dynamic admin dashboard to manage catalogued books, rentals, users, and tracking.",
      "Real-time search functionality and pagination filters.",
      "Custom responsive CSS layout engineered from grid/flex design principles.",
      "Optimized database indexing to ensure query execution speeds remain under 50ms."
    ],
    contribution: "Coordinated with mock operational users to define user flow, control compliance, and analytical requirements."
  },
  calculator: {
    title: "Simple Desktop Calculator",
    metrics: "Robust, crash-free interface utilizing Object-Oriented Programming (OOP) architectures.",
    technologies: ["Python 3", "Tkinter (GUI Library)", "Object-Oriented Design", "Exception Handling"],
    features: [
      "Desktop GUI application featuring clean color scheme and hover button states.",
      "Supports basic operations (+, -, *, /) along with keyboard bindings and state clearing.",
      "Integrated memory storage operations (MS, MR, M+, M-).",
      "Applied OOP principles to divide logic engines and UI window layout handlers.",
      "Engineered comprehensive try-catch statements to securely isolate Division by Zero and type mismatch errors."
    ],
    contribution: "Designed, coded, and self-tested the logic module from scratch as a standalone GUI application."
  }
};

function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContentEl = document.getElementById('modal-body-content');

  // Hydrate modal HTML
  modalContentEl.innerHTML = `
    <h3 class="modal-title">${project.title}</h3>
    
    <div class="project-metrics" style="margin-bottom: 1.5rem; width: 100%;">
      <i class="fa-solid fa-square-poll-vertical"></i> <strong>Performance Impact:</strong> ${project.metrics}
    </div>

    <div class="modal-section-title">Key Features</div>
    <ul class="modal-bullet-list">
      ${project.features.map(feat => `<li>${feat}</li>`).join('')}
    </ul>

    <div class="modal-section-title">Technologies Used</div>
    <div class="project-tags" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
      ${project.technologies.map(tech => `<span class="project-tag" style="background: rgba(124,77,255,0.08); border-color: rgba(124,77,255,0.25); color: var(--text-main); font-size: 0.85rem; padding: 0.5rem 1rem;">${tech}</span>`).join('')}
    </div>

    <div class="modal-section-title">Operational Context & Contribution</div>
    <p style="color: var(--text-muted); line-height: 1.7;">${project.contribution}</p>
  `;

  // Display modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scroll
}

// Esc close modal keybinding
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// 5. Contact Form Simulation
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all the fields before submitting.", "error");
      return;
    }

    // Set submitting status UI
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;
    statusEl.style.display = 'none';

    // Simulate mock mail endpoint request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;

      // Trigger success visual state
      showStatus(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`, "success");
      form.reset();
    }, 1800);
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
    statusEl.style.display = 'block';
    
    // Auto-scroll slightly to show the message status clearly if needed
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}