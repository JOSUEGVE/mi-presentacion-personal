document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const typingElement = document.getElementById('typing-text');
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailText = document.getElementById('copy-email-text');
    const contactEmailCard = document.getElementById('contact-email-card');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const yearSpan = document.getElementById('year');

    // Set dynamic current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 1. Theme Toggle (Dark / Light Mode)
    // ==========================================================================
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
            themeIcon.style.color = '#f59e0b';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeIcon.style.color = '#10b981';
        }
    }

    // ==========================================================================
    // 2. Mobile Menu Toggle
    // ==========================================================================
    menuToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        menuToggleBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // ==========================================================================
    // 3. Navbar Scroll Effect & Active Section Highlighting
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar shadow/blur background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // ==========================================================================
    // 4. Typing Effect for Hero Title
    // ==========================================================================
    const phrases = [
        "Ingeniería en Sistemas Computacionales",
        "Análisis de Tecnologías (TIC)",
        "Infraestructura y Redes",
        "Gestión de Sistemas Municipales",
        "Soporte y Soluciones Digitales"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before new phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ==========================================================================
    // 5. Copy Email to Clipboard Functionality
    // ==========================================================================
    const emailToCopy = "josuegallardovera@gmail.com";

    function handleCopyEmail() {
        navigator.clipboard.writeText(emailToCopy).then(() => {
            showToast("¡Correo copiado al portapapeles!");
            if (copyEmailText) {
                copyEmailText.textContent = "¡Copiado!";
                setTimeout(() => {
                    copyEmailText.textContent = "Copiar Email";
                }, 2000);
            }
        }).catch(err => {
            console.error("Error al copiar: ", err);
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', handleCopyEmail);
    }

    if (contactEmailCard) {
        contactEmailCard.addEventListener('click', handleCopyEmail);
    }

    function showToast(msg) {
        if (!toast) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
