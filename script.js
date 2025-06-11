document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading screen
    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Magnetic buttons effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 10;
            const deltaY = (y - centerY) / centerY * 10;
            
            this.style.setProperty('--tx', deltaX + 'px');
            this.style.setProperty('--ty', deltaY + 'px');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.setProperty('--tx', '0');
            this.style.setProperty('--ty', '0');
        });
    });
    
    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "l'identité visuelle qui parle sans mots",
        "le lien entre pixels et émotions",
        "la trace mnésique dans l'océan digital"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter effect
    typeWriter();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
    
    // Dark/light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    const darkIconMobile = document.getElementById('dark-icon-mobile');
    const lightIconMobile = document.getElementById('light-icon-mobile');
    
    function toggleTheme() {
        document.documentElement.classList.toggle('light-mode');
        
        if (document.documentElement.classList.contains('light-mode')) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            darkIconMobile.classList.add('hidden');
            lightIconMobile.classList.remove('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            darkIconMobile.classList.remove('hidden');
            lightIconMobile.classList.add('hidden');
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('bg-primary-accent', 'bg-opacity-20'));
            this.classList.add('bg-primary-accent', 'bg-opacity-20');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
    
    // Lightbox for projects
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.getElementById('close-lightbox');
    
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            lightboxImage.src = projectCard.querySelector('img').src;
            lightboxTitle.textContent = projectCard.querySelector('h3').textContent;
            lightboxDescription.textContent = projectCard.querySelector('p').textContent;
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            const inputs = [
                { element: nameInput, error: document.getElementById('name-error'), message: 'Veuillez entrer votre nom' },
                { element: emailInput, error: document.getElementById('email-error'), message: 'Veuillez entrer une adresse email valide', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
                { element: subjectInput, error: document.getElementById('subject-error'), message: 'Veuillez entrer un sujet' },
                { element: messageInput, error: document.getElementById('message-error'), message: 'Veuillez entrer votre message' }
            ];
            
            let isValid = true;
            
            inputs.forEach(({ element, error, message, regex }) => {
                if (element.value.trim() === '' || (regex && !regex.test(element.value.trim()))) {
                    element.classList.add('input-error');
                    error.textContent = message;
                    error.style.display = 'block';
                    isValid = false;
                } else {
                    element.classList.remove('input-error');
                    error.style.display = 'none';
                }
            });
            
            if (!isValid) return;
            
            // Submit to FormSubmit
            try {
                const formData = new FormData(contactForm);
                
                // Add honeypot for spam prevention
                formData.append('_honeypot', '');
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GSAP animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        });
        
        // Animate skill cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.5,
                delay: i * 0.1
            });
        });
    }
});