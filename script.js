/* ============================================
   PARADISE LUXURY SALON — PREMIUM JAVASCRIPT
   Advanced Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 2200);
    });

    // Fallback — remove preloader after 4 seconds
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }
    }, 4000);

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorDot = document.getElementById('cursorDot');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            cursorDot.classList.add('visible');
            cursorFollower.classList.add('visible');
        });

        // Smooth follow animation
        function animateCursor() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects for interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .service-card, .gallery-item, .pricing-card');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
            target.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
        });
    }

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Floating actions
        const floatingActions = document.getElementById('floatingActions');
        if (floatingActions) {
            if (scrollY > 400) {
                floatingActions.classList.add('visible');
            } else {
                floatingActions.classList.remove('visible');
            }
        }

        lastScroll = scrollY;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link, .mobile-menu-cta a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Back to top
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    function initAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale');

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number, .stat-number');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);

                        el.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounters();

    // ============================================
    // HERO PARTICLES
    // ============================================
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const particleCount = window.innerWidth < 768 ? 10 : 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 4 + 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.12 + 0.03;

            container.appendChild(particle);
        }
    }

    createParticles();

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    function startTestimonialRotation() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    startTestimonialRotation();

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            currentTestimonial = parseInt(dot.getAttribute('data-index'));
            showTestimonial(currentTestimonial);
            startTestimonialRotation();
        });
    });

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    function initParallax() {
        const heroImage = document.querySelector('.hero-image-wrapper');
        const resultsCard = document.querySelector('.hero-results-card');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero');
            const heroBottom = heroSection.offsetHeight;

            if (scrollY < heroBottom) {
                const factor = scrollY * 0.15;

                if (heroImage) {
                    heroImage.style.transform = `translateY(${factor}px)`;
                }

                if (resultsCard) {
                    resultsCard.style.animationPlayState = 'running';
                }
            }
        });
    }

    initParallax();

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    if (window.matchMedia('(hover: hover)').matches) {
        initMagneticButtons();
    }

    // ============================================
    // TILT EFFECT ON CARDS
    // ============================================
    function initTiltEffect() {
        const cards = document.querySelectorAll('.service-card, .pricing-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const tiltX = (y - 0.5) * 8;
                const tiltY = (x - 0.5) * -8;

                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    if (window.matchMedia('(hover: hover)').matches) {
        initTiltEffect();
    }

    // ============================================
    // SMOOTH TEXT REVEAL ON HERO
    // ============================================
    function initTextReveal() {
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, i) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(60px)';
            line.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.12}s`;

            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 2400);
        });
    }

    initTextReveal();

    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.classList.add('loading');

            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');

                // Show success state
                contactForm.innerHTML = `
                    <div class="form-success">
                        <div class="form-success-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h3>Appointment Requested!</h3>
                        <p>Thank you for choosing Paradise Luxury Salon. We'll confirm your appointment within 30 minutes via call or WhatsApp.</p>
                    </div>
                `;
            }, 2000);
        });

        // Floating label effects
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // ============================================
    // IMAGE LAZY LOADING WITH FADE
    // ============================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // ============================================
    // GALLERY IMAGE HOVER EFFECTS
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.5';
                    other.style.filter = 'grayscale(50%)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(other => {
                other.style.opacity = '1';
                other.style.filter = '';
            });
        });
    });

    // ============================================
    // SMOOTH SCROLL PROGRESS INDICATOR
    // ============================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #c9a96e, #dfc291, #c9a96e);
            z-index: 10001;
            transition: width 0.1s linear;
            border-radius: 0 2px 2px 0;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    createScrollProgress();

    // ============================================
    // STAGGER ANIMATION ON FEATURES
    // ============================================
    const featureItems = document.querySelectorAll('.feature-item');
    const featuresObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 120);
            });
            featuresObserver.disconnect();
        }
    }, { threshold: 0.3 });

    if (featureItems.length > 0) {
        featureItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        featuresObserver.observe(document.querySelector('.features-bar'));
    }

    // ============================================
    // TYPED TEXT EFFECT ON HERO SUBTITLE
    // ============================================
    function initTypedEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const phrases = [
            'EXPERIENCE PREMIUM HAIR CARE',
            'WORLD-CLASS STYLISTS',
            'LUXURY SALON EXPERIENCE',
            'STUNNING TRANSFORMATIONS'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 80;

        // Only start after preloader
        setTimeout(() => {
            function type() {
                const currentPhrase = phrases[phraseIndex];

                if (isDeleting) {
                    charIndex--;
                    typingDelay = 40;
                } else {
                    charIndex++;
                    typingDelay = 80;
                }

                // Preserve the line-accent span
                subtitle.innerHTML = `<span class="line-accent"></span> ${currentPhrase.substring(0, charIndex)}`;

                if (!isDeleting && charIndex === currentPhrase.length) {
                    typingDelay = 3000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typingDelay = 500;
                }

                setTimeout(type, typingDelay);
            }

            type();
        }, 3500);
    }

    initTypedEffect();

    // ============================================
    // SERVICE CARD NUMBER ANIMATION
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const number = card.querySelector('.service-number');
        card.addEventListener('mouseenter', () => {
            if (number) {
                number.style.transform = 'scale(1.2) translateX(-5px)';
                number.style.color = 'rgba(201, 169, 110, 0.2)';
                number.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (number) {
                number.style.transform = '';
                number.style.color = '';
            }
        });
    });

});
