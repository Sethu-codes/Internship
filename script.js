document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
            // Toggle between bars and times icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Popup modal references
    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.getElementById('closeModal');

    // Open popup on index.html after 5 seconds
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index') {
        setTimeout(() => {
            modal.classList.add('active');
        }, 5000);
    }

    // Close popup function
    function closePopup() {
        modal.classList.remove('active');
    }

    // Close modal when clicking close button
    closeBtn?.addEventListener('click', closePopup);

    // Close modal when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePopup();
        }
    });

    // Pop-up form submission handler
    const popupForm = document.getElementById("popup-enquiry-form");
    if (popupForm) {
        popupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Form submitted!");
            closePopup();
        });
    }

    // Mobile Dropdown Menus (works on resize too)
    function setupMobileDropdowns() {
        const dropdownItems = document.querySelectorAll('.has-dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('a');
            // Remove previous listeners
            link.onclick = null;
            if (window.innerWidth <= 768) {
                link.onclick = function(e) {
                    e.preventDefault();
                    item.classList.toggle('active');
                };
            }
        });
    }
    setupMobileDropdowns();
    window.addEventListener('resize', setupMobileDropdowns);

    // Close menu when clicking a link (mobile)
    document.querySelectorAll('.main-nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Testimonial Slider
    let slides = document.querySelectorAll('.testimonial-slide');
    let dots = document.querySelectorAll('.slider-dot');
    let idx = 0;

    function showSlide(i) {
        slides.forEach((s, j) => {
            s.classList.toggle('active', j === i);
            dots[j].classList.toggle('active', j === i);
        });
        idx = i;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    setInterval(() => {
        showSlide((idx + 1) % slides.length);
    }, 2000);

    // Help Desk Chat functionality
    const helpDeskToggle = document.querySelector('.help-desk-toggle');
    const helpDeskContent = document.querySelector('.help-desk-content');
    const closeHelpDesk = document.querySelector('.close-help-desk');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.querySelector('.chat-messages');

    if (helpDeskToggle) {
        helpDeskToggle.addEventListener('click', function() {
            helpDeskContent.classList.toggle('active');
        });
    }

    if (closeHelpDesk) {
        closeHelpDesk.addEventListener('click', function() {
            helpDeskContent.classList.remove('active');
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const message = chatInput.value.trim();
            if (message !== '') {
                const userMessageElement = document.createElement('div');
                userMessageElement.classList.add('message', 'user-message');
                userMessageElement.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(userMessageElement);

                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    const botMessageElement = document.createElement('div');
                    botMessageElement.classList.add('message', 'bot-message');
                    botMessageElement.innerHTML = `<p>Thank you for your message. One of our representatives will get back to you shortly.</p>`;
                    chatMessages.appendChild(botMessageElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });
    }

    // Quick Enquiry Form Validation
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const propertyType = document.getElementById('property-type').value;

            if (name === '' || email === '' || phone === '' || propertyType === '') {
                alert('Please fill all required fields');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            alert('Thank you for your enquiry! Our team will contact you shortly.');
            enquiryForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Sticky header effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 100) {
            header.classList.add('scrolled');

            if (currentScroll > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll;
    });

    // Scroll reveal animation with staggered effect for .animate elements
    const scrollElements = document.querySelectorAll('.animate');

    const elementInView = (el, dividend = 1) =>
        el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;

    const displayScrollElement = (element, index) => {
        element.style.transitionDelay = `${index * 100}ms`;
        element.classList.add('scrolled-in');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el, index) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el, index);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    // (Remove or comment this line to prevent elements appearing before scroll)

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Inject popup modal animation styles
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
        #enquiryModal {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        #enquiryModal.active {
            opacity: 1;
            transform: scale(1);
            display: flex !important;
        }
        .animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scrolled-in {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0s !important;
        }
        /* Slide-up animation for page content */
        main > *, main section, main article {
            opacity: 0;
            transform: translateY(20px);
            transition: transform 0.6s ease-out, opacity 0.6s ease-out;
        }

        .slide-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(popupStyle);

    // Scroll-triggered slide-up animation
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const slideUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Select .content-block elements for scroll-triggered animation
    const blocksToAnimate = document.querySelectorAll('.content-block');
    blocksToAnimate.forEach(el => slideUpObserver.observe(el));

    // Hero content fade-in effect
    document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content a').forEach(el => {
        el.style.opacity = '1';
    });

    // Number animation for stats
    function animateNumber(el, target, duration = 1200) {
        let start = 0;
        let startTime = null;
        function updateNumber(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * (target - start) + start);
            if (progress < 1) requestAnimationFrame(updateNumber);
            else el.textContent = target + (el.dataset.suffix || '');
        }
        requestAnimationFrame(updateNumber);
    }

    function runStatsAnimation() {
        document.querySelectorAll('.overview-card h3').forEach(card => {
            if (!card.dataset.animated) {
                const num = card.textContent.replace(/\D/g, '');
                if (num) {
                    card.dataset.animated = "true";
                    animateNumber(card, parseInt(num), 1200);
                }
            }
        });
    }

    window.addEventListener('scroll', function() {
        const section = document.querySelector('.company-overview');
        if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
            runStatsAnimation();
        }
    });

    // Reveal sections on scroll
    function revealSectionsOnScroll() {
        document.querySelectorAll('.section-fade').forEach(sec => {
            if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
                sec.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealSectionsOnScroll);
    window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);
});

window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 1s ease-in';
    document.body.style.opacity = 1;
});
