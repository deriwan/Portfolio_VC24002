/* ==========================================================================
   BVI3124 Assignment 1: Personal Portfolio
   Author: Deriwan Akhmal Bin Mohd Nasir (VC24002)
   Description: Interactive Vanilla JavaScript Features
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatic Copyright Year
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Responsive Hamburger Menu Toggle (Mobile)
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const isExpanded = navLinks.classList.contains("active");
            hamburgerBtn.setAttribute("aria-expanded", isExpanded);
        });
    }

    // 3. Time-Based Greeting & Typing Effect (index.html)
    const greetingEl = document.getElementById("timeGreeting");
    if (greetingEl) {
        const hour = new Date().getHours();
        let greetingText = "Good Evening";
        if (hour < 12) {
            greetingText = "Good Morning";
        } else if (hour < 18) {
            greetingText = "Good Afternoon";
        }
        greetingEl.textContent = `${greetingText}, Welcome to My Portfolio`;
    }

    const typingEl = document.getElementById("typingText");
    if (typingEl) {
        const roles = [
            "Industrial Electronic Automation Technologist",
            "PLC & HMI Control Systems Developer",
            "Embedded IoT & Arduino Enthusiast",
            "Quality Control & Calibration Specialist"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 45 : 85;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = 1800; // Pause at full sentence
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    // 4. "Read More" Show/Hide Toggle (about.html)
    const readMoreBtn = document.getElementById("readMoreBtn");
    const extraBio = document.getElementById("extraBio");

    if (readMoreBtn && extraBio) {
        readMoreBtn.addEventListener("click", () => {
            const isHidden = extraBio.style.display === "none" || extraBio.style.display === "";
            if (isHidden) {
                extraBio.style.display = "block";
                readMoreBtn.textContent = "Show Less";
            } else {
                extraBio.style.display = "none";
                readMoreBtn.textContent = "Read More About My Journey";
            }
        });
    }

    // 5. Skills Category Tabs (skills.html)
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabBtns.length > 0) {
        tabBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                // Remove active state from all buttons and panels
                tabBtns.forEach((b) => b.classList.remove("active"));
                tabPanels.forEach((p) => p.classList.remove("active"));

                // Activate clicked tab
                btn.classList.add("active");
                const targetPanel = document.getElementById(btn.dataset.target);
                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            });
        });
    }

    // 6. Project Category Filter & Details Modal (projects.html)
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const category = btn.dataset.filter;
                projectCards.forEach((card) => {
                    if (category === "all" || card.dataset.category === category) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // Project Modal Data & Logic
    const projectDetailsData = {
        lpg: {
            title: "Smart LPG Gas Leakage Detector with Auto Shut-Off & Telegram Alert",
            category: "Embedded IoT & Safety Automation",
            problem: "Homeowners often leave their houses unattended and are unable to detect dangerous LPG gas leaks in real time, increasing the risk of fire or explosion.",
            role: "Lead Developer – Designed the circuit simulation in Proteus, programmed the Arduino microcontroller, and integrated Telegram Bot API notifications.",
            tools: "Arduino IDE, Proteus Simulation, MQ-2 Gas Sensor, Servo/Solenoid Valve, Telegram Bot API",
            outcome: "Successfully detected gas concentration thresholds, triggered an automatic valve shut-off mechanism, and delivered instant warning alerts via Telegram. Won 4th Place in the Final Year Innovation Project Competition."
        },
        water: {
            title: "Industrial Water Tank Level Monitoring & Control System",
            category: "PLC & HMI Automation",
            problem: "Manual monitoring of water storage tanks frequently leads to delayed pump control, causing water overflow, resource wastage, and operational inefficiency.",
            role: "Automation System Developer – Developed the ladder logic program and designed the operator interface screen.",
            tools: "Omron CX-Programmer, NB-Designer HMI, Level Sensors, Relay Control",
            outcome: "Accurately monitored and displayed Low, Medium, and High water levels in real time on the HMI panel while automating pump start/stop sequences."
        },
        brooder: {
            title: "Automated Smart Chicken Brooder Temperature Control System",
            category: "Embedded IoT & Agriculture Tech",
            problem: "Newly hatched chicks require strict, consistent ambient temperatures during their first two weeks of life to ensure healthy survival and growth.",
            role: "System Designer & Programmer – Built the closed-loop thermal control logic and cloud data logging integration.",
            tools: "Arduino IDE, Proteus, DHT22 Temperature Sensor, Heating Lamp Actuator, Google Sheets API",
            outcome: "Maintained optimal brooder temperature automatically using heating lamps and logged real-time temperature data directly into Google Sheets for remote tracking."
        }
    };

    const modal = document.getElementById("projectModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const viewProjectBtns = document.querySelectorAll(".view-project-btn");

    if (modal && viewProjectBtns.length > 0) {
        viewProjectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const projectKey = btn.dataset.project;
                const data = projectDetailsData[projectKey];
                if (data) {
                    document.getElementById("modalTitle").textContent = data.title;
                    document.getElementById("modalCategory").textContent = data.category;
                    document.getElementById("modalProblem").textContent = data.problem;
                    document.getElementById("modalRole").textContent = data.role;
                    document.getElementById("modalTools").textContent = data.tools;
                    document.getElementById("modalOutcome").textContent = data.outcome;
                    modal.classList.add("open");
                }
            });
        });

        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("open");
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("open");
            }
        });
    }

    // 7. Compulsory Contact Form Validation (contact.html)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Input elements
            const nameInput = document.getElementById("fullName");
            const emailInput = document.getElementById("email");
            const subjectInput = document.getElementById("subject");
            const messageInput = document.getElementById("message");

            // Error display elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const subjectError = document.getElementById("subjectError");
            const messageError = document.getElementById("messageError");
            const formFeedback = document.getElementById("formFeedback");

            // Reset previous messages
            nameError.textContent = "";
            emailError.textContent = "";
            subjectError.textContent = "";
            messageError.textContent = "";
            formFeedback.style.display = "none";
            formFeedback.className = "form-feedback";

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim().length < 3) {
                nameError.textContent = "Please enter your full name (minimum 3 characters).";
                isValid = false;
            }

            // Validate Email with Regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = "Please enter a valid email address (e.g., name@domain.com).";
                isValid = false;
            }

            // Validate Subject
            if (subjectInput.value.trim() === "") {
                subjectError.textContent = "Please enter a subject for your inquiry.";
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim().length < 15) {
                messageError.textContent = "Please write a message with at least 15 characters.";
                isValid = false;
            }

            // If all inputs pass validation
            if (isValid) {
                formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been validated and sent successfully.`;
                formFeedback.classList.add("success");
                formFeedback.style.display = "block";
                contactForm.reset();
            }
        });
    }

    // 8. Scroll-to-Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});