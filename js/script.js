
/* =========================================
   DERIWAN AKHMAL - BROWN MOCHA PORTFOLIO
   Main JavaScript
   ========================================= */

"use strict";

/* =========================================
   1. INITIALIZE WEBSITE
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();
    initializeCopyright();
    initializeGreeting();
    initializeTypingEffect();
    initializeReadMore();
    initializeSkillTabs();
    initializeProjectFilter();
    initializeProjectModal();
    initializeContactForm();
    initializeScrollToTop();

});


/* =========================================
   2. RESPONSIVE NAVIGATION
   ========================================= */

function initializeNavigation() {

    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (!hamburger || !navLinks) {
        return;
    }

    function closeNavigation() {

        navLinks.classList.remove("show");

        hamburger.setAttribute("aria-expanded", "false");

        const icon = hamburger.querySelector(".ui-icon");

        if (icon) {
            icon.textContent = "☰";
        }

    }

    hamburger.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("show");

        hamburger.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        const icon = hamburger.querySelector(".ui-icon");

        if (icon) {
            icon.textContent = isOpen ? "✕" : "☰";
        }

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeNavigation);

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeNavigation();
        }

    });

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedHamburger) {
            closeNavigation();
        }

    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            closeNavigation();
        }

    });

}


/* =========================================
   3. AUTOMATIC COPYRIGHT YEAR
   ========================================= */

function initializeCopyright() {

    const yearElements = document.querySelectorAll("#currentYear");

    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });

}


/* =========================================
   4. TIME-BASED GREETING
   ========================================= */

function initializeGreeting() {

    const greetingElement = document.getElementById("timeGreeting");

    if (!greetingElement) {
        return;
    }

    const currentHour = new Date().getHours();

    let greeting = "";

    if (currentHour >= 5 && currentHour < 12) {

        greeting = "Good Morning! Welcome to My Portfolio";

    } else if (currentHour >= 12 && currentHour < 18) {

        greeting = "Good Afternoon! Welcome to My Portfolio";

    } else {

        greeting = "Good Evening! Welcome to My Portfolio";

    }

    greetingElement.textContent = greeting;

}


/* =========================================
   5. HOME PAGE TYPING EFFECT
   ========================================= */

function initializeTypingEffect() {

    const typingElement = document.getElementById("typingText");

    if (!typingElement) {
        return;
    }

    const titles = [
        "Industrial Electronic Automation Student",
        "Electronics & Embedded Systems Enthusiast",
        "PLC and Automation Technology Learner",
        "Passionate About Practical Innovation"
    ];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {

        typingElement.textContent = titles[0];
        return;

    }

    let titleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeText() {

        const currentTitle = titles[titleIndex];

        if (isDeleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }

        typingElement.textContent = currentTitle.substring(
            0,
            characterIndex
        );

        let typingSpeed = isDeleting ? 45 : 85;

        if (!isDeleting && characterIndex === currentTitle.length) {

            isDeleting = true;
            typingSpeed = 1800;

        } else if (isDeleting && characterIndex === 0) {

            isDeleting = false;

            titleIndex = (titleIndex + 1) % titles.length;

            typingSpeed = 450;

        }

        window.setTimeout(typeText, typingSpeed);

    }

    typeText();

}


/* =========================================
   6. ABOUT PAGE READ MORE
   ========================================= */

function initializeReadMore() {

    const readMoreButton = document.getElementById("readMoreBtn");
    const extraBio = document.getElementById("extraBio");

    if (!readMoreButton || !extraBio) {
        return;
    }

    readMoreButton.addEventListener("click", function () {

        const isExpanded =
            readMoreButton.getAttribute("aria-expanded") === "true";

        const newState = !isExpanded;

        extraBio.hidden = !newState;

        readMoreButton.setAttribute(
            "aria-expanded",
            String(newState)
        );

        readMoreButton.textContent = newState
            ? "Read Less"
            : "Read More About Me";

    });

}


/* =========================================
   7. INTERACTIVE SKILLS TABS
   ========================================= */

function initializeSkillTabs() {

    const tabs = Array.from(
        document.querySelectorAll(".skill-tab")
    );

    const panels = Array.from(
        document.querySelectorAll(".skill-panel")
    );

    if (tabs.length === 0 || panels.length === 0) {
        return;
    }

    function activateTab(selectedTab, moveFocus = false) {

        const targetId = selectedTab.dataset.target;

        tabs.forEach(function (tab) {

            const isActive = tab === selectedTab;

            tab.classList.toggle("active", isActive);

            tab.setAttribute(
                "aria-selected",
                String(isActive)
            );

            tab.tabIndex = isActive ? 0 : -1;

        });

        panels.forEach(function (panel) {

            const isActive = panel.id === targetId;

            panel.classList.toggle("active", isActive);

            panel.hidden = !isActive;

        });

        if (moveFocus) {
            selectedTab.focus();
        }

    }

    tabs.forEach(function (tab, index) {

        tab.addEventListener("click", function () {

            activateTab(tab);

        });

        tab.addEventListener("keydown", function (event) {

            let nextIndex = index;

            if (event.key === "ArrowRight") {

                nextIndex = (index + 1) % tabs.length;

            } else if (event.key === "ArrowLeft") {

                nextIndex = (index - 1 + tabs.length) % tabs.length;

            } else if (event.key === "Home") {

                nextIndex = 0;

            } else if (event.key === "End") {

                nextIndex = tabs.length - 1;

            } else {

                return;

            }

            event.preventDefault();

            activateTab(tabs[nextIndex], true);

        });

    });

    const initialTab = tabs.find(function (tab) {

        return tab.classList.contains("active");

    }) || tabs[0];

    activateTab(initialTab);

}


/* =========================================
   8. PROJECT CATEGORY FILTER
   ========================================= */

function initializeProjectFilter() {

    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectCards = document.querySelectorAll(".project-card");

    const noProjectsMessage =
        document.getElementById("noProjectsMessage");

    if (filterButtons.length === 0 || projectCards.length === 0) {
        return;
    }

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {

                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);

                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            let visibleCount = 0;

            projectCards.forEach(function (card) {

                const projectCategory = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    projectCategory === selectedCategory;

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCount++;
                }

            });

            if (noProjectsMessage) {

                noProjectsMessage.hidden = visibleCount !== 0;

            }

        });

    });

}


/* =========================================
   9. PROJECT INFORMATION
   ========================================= */

const projectDetails = {

    lpg: {

        category: "Electronics & Safety",

        title: "LPG Gas Detector with Exhaust Fan",

        problem:
            "LPG gas leakage can create safety risks when it is not detected early. This project explored an electronic gas detection system with an exhaust fan response.",

        role:
            "Developed the project as part of my Diploma in Electronic Technology final year work, including system development, component integration and project testing.",

        tools:
            "Gas sensor, electronic circuit components, exhaust fan and electronic control system.",

        outcome:
            "The project was presented in a final year innovation competition and achieved fourth place."

    },

    water: {

        category: "PLC & Industrial Automation",

        title: "Water Tank Level Monitoring System",

        problem:
            "Water level control requires monitoring and suitable control logic to respond to different tank level conditions.",

        role:
            "Worked on PLC ladder logic and water level control operations as part of an academic automation exercise.",

        tools:
            "OMRON PLC, CX-Programmer, ladder logic and water level control components.",

        outcome:
            "Developed practical understanding of PLC programming, control sequences and water level monitoring logic."

    },

    brooder: {

        category: "Embedded Systems & Smart Agriculture",

        title: "Smart Chicken Brooder",

        problem:
            "Young chicks require suitable brooding temperatures. Manual temperature monitoring and heating adjustments can be inconvenient and inconsistent.",

        role:
            "Worked on integrating an ESP32 microcontroller, temperature sensing, relay-controlled heating and monitoring components for the brooder system.",

        tools:
            "ESP32, DHT temperature sensor, relay modules, heating lamps, LCD display and Google Sheets integration.",

        outcome:
            "Developed a temperature monitoring and heating control prototype for a smart poultry brooder, with data monitoring features."

    }

};


/* =========================================
   10. PROJECT DETAILS MODAL
   ========================================= */

function initializeProjectModal() {

    const modal = document.getElementById("projectModal");

    const viewButtons = document.querySelectorAll(".view-project-btn");

    const closeButton = document.getElementById("closeModalBtn");

    const closeAction = document.getElementById("modalCloseAction");

    if (!modal || viewButtons.length === 0) {
        return;
    }

    const modalFields = {

        category: document.getElementById("modalCategory"),

        title: document.getElementById("modalTitle"),

        problem: document.getElementById("modalProblem"),

        role: document.getElementById("modalRole"),

        tools: document.getElementById("modalTools"),

        outcome: document.getElementById("modalOutcome")

    };

    let previousFocus = null;

    function openModal(projectId) {

        const project = projectDetails[projectId];

        if (!project) {
            return;
        }

        modalFields.category.textContent = project.category;

        modalFields.title.textContent = project.title;

        modalFields.problem.textContent = project.problem;

        modalFields.role.textContent = project.role;

        modalFields.tools.textContent = project.tools;

        modalFields.outcome.textContent = project.outcome;

        previousFocus = document.activeElement;

        modal.hidden = false;

        document.body.classList.add("modal-open");

        if (closeButton) {
            closeButton.focus();
        } else {
            modal.focus();
        }

    }

    function closeModal() {

        if (modal.hidden) {
            return;
        }

        modal.hidden = true;

        document.body.classList.remove("modal-open");

        if (previousFocus && previousFocus.isConnected) {
            previousFocus.focus();
        }

    }

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const projectId = button.dataset.project;

            openModal(projectId);

        });

    });

    if (closeButton) {

        closeButton.addEventListener("click", closeModal);

    }

    if (closeAction) {

        closeAction.addEventListener("click", closeModal);

    }

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeModal();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (modal.hidden) {
            return;
        }

        if (event.key === "Escape") {

            event.preventDefault();

            closeModal();

            return;

        }

        if (event.key === "Tab") {

            const focusableElements = Array.from(
                modal.querySelectorAll(
                    'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter(function (element) {

                return element.getClientRects().length > 0;

            });

            if (focusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];

            const lastElement =
                focusableElements[focusableElements.length - 1];

            if (event.shiftKey &&
                document.activeElement === firstElement) {

                event.preventDefault();

                lastElement.focus();

            } else if (!event.shiftKey &&
                       document.activeElement === lastElement) {

                event.preventDefault();

                firstElement.focus();

            }

        }

    });

}


/* =========================================
   11. CONTACT FORM VALIDATION
   ========================================= */

function initializeContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    const nameInput = document.getElementById("contactName");

    const emailInput = document.getElementById("contactEmail");

    const subjectInput = document.getElementById("contactSubject");

    const messageInput = document.getElementById("contactMessage");

    const formStatus = document.getElementById("formStatus");

    const fields = [
        {
            input: nameInput,
            errorId: "nameError",
            label: "Full name"
        },
        {
            input: emailInput,
            errorId: "emailError",
            label: "Email address"
        },
        {
            input: subjectInput,
            errorId: "subjectError",
            label: "Subject"
        },
        {
            input: messageInput,
            errorId: "messageError",
            label: "Message"
        }
    ];

    function showError(input, errorId, message) {

        const errorElement = document.getElementById(errorId);

        input.classList.add("invalid");

        input.setAttribute("aria-invalid", "true");

        if (errorElement) {
            errorElement.textContent = message;
        }

    }

    function clearError(input, errorId) {

        const errorElement = document.getElementById(errorId);

        input.classList.remove("invalid");

        input.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.textContent = "";
        }

    }

    function validateField(field) {

        const input = field.input;

        const value = input.value.trim();

        clearError(input, field.errorId);

        if (value === "") {

            showError(
                input,
                field.errorId,
                field.label + " is required."
            );

            return false;

        }

        if (input === nameInput && value.length < 2) {

            showError(
                input,
                field.errorId,
                "Please enter at least 2 characters."
            );

            return false;

        }

        if (input === emailInput) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                showError(
                    input,
                    field.errorId,
                    "Please enter a valid email address."
                );

                return false;

            }

        }

        if (input === subjectInput && value.length < 3) {

            showError(
                input,
                field.errorId,
                "Subject must contain at least 3 characters."
            );

            return false;

        }

        if (input === messageInput && value.length < 10) {

            showError(
                input,
                field.errorId,
                "Message must contain at least 10 characters."
            );

            return false;

        }

        return true;

    }

    fields.forEach(function (field) {

        field.input.addEventListener("input", function () {

            if (field.input.getAttribute("aria-invalid") === "true") {

                validateField(field);

            }

            formStatus.textContent = "";

            formStatus.className = "form-status";

        });

        field.input.addEventListener("blur", function () {

            if (field.input.value.trim() !== "") {
                validateField(field);
            }

        });

    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let formIsValid = true;

        let firstInvalidInput = null;

        fields.forEach(function (field) {

            const fieldIsValid = validateField(field);

            if (!fieldIsValid) {

                formIsValid = false;

                if (!firstInvalidInput) {
                    firstInvalidInput = field.input;
                }

            }

        });

        if (!formIsValid) {

            formStatus.textContent =
                "Please correct the highlighted fields before continuing.";

            formStatus.className = "form-status error";

            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }

            return;

        }

        const fullName = nameInput.value.trim();

        const email = emailInput.value.trim();

        const subject = subjectInput.value.trim();

        const message = messageInput.value.trim();

        const emailBody = [
            "Hello Deriwan,",
            "",
            message,
            "",
            "Best regards,",
            fullName,
            "Email: " + email
        ].join("\n");

        const mailtoLink =
            "mailto:jangvans123@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        formStatus.textContent =
            "Validation successful. Your email application should open with the message prepared. Please press Send in your email application.";

        formStatus.className = "form-status success";

        window.location.href = mailtoLink;

    });

}


/* =========================================
   12. SCROLL TO TOP BUTTON
   ========================================= */

function initializeScrollToTop() {

    const scrollButton = document.getElementById("scrollTopBtn");

    if (!scrollButton) {
        return;
    }

    function updateScrollButton() {

        if (window.scrollY > 350) {

            scrollButton.classList.add("show");

        } else {

            scrollButton.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        updateScrollButton,
        { passive: true }
    );

    scrollButton.addEventListener("click", function () {

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({

            top: 0,

            behavior: reducedMotion ? "auto" : "smooth"

        });

    });

    updateScrollButton();

}
