document.addEventListener('DOMContentLoaded', function () {
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Page transition
    document.body.classList.add('page-transition');

    // Scroll-triggered animations
    gsap.utils.toArray('.fade-in').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                scrollTrigger: { trigger: el, start: 'top 80%' } 
            }
        );
    });

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html' || currentPage === '') {
        document.getElementById('nav-home').classList.add('active-link');
    } else if (currentPage === 'projects.html') {
        document.getElementById('nav-projects').classList.add('active-link');
    } else if (currentPage === 'team.html') {
        document.getElementById('nav-team').classList.add('active-link');
    } else if (currentPage === 'contact.html') {
        document.getElementById('nav-contact').classList.add('active-link');
    }

    // Hero Headline Animation
    var heroTextWrapper = document.querySelector('.hero-headline');
    if (heroTextWrapper) {
        heroTextWrapper.innerHTML = "Empowering Your Business with Future-Proof IT Solutions".replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: '.hero-headline .letter',
                scale: [4, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: (el, i) => 70 * i
            });
    }

    // Team Headline Animation
    var teamTextWrapper = document.querySelector('.team-headline');
    if (teamTextWrapper) {
        teamTextWrapper.innerHTML = teamTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: '.team-headline .letter',
                scale: [4, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: (el, i) => 70 * i
            });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    };

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Team Modals
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function () {
            const memberId = this.dataset.member;
            const modal = document.getElementById(`modal-${memberId}`);
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('show'), 10);
            }
        });
    });

    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            setTimeout(() => event.target.classList.add('hidden'), 300);
        }
    });

    // Testimonial Carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            if (i === index) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    if (totalTestimonials > 0) {
        showTestimonial(currentTestimonial);

        const nextBtn = document.querySelector('.carousel-next');
        const prevBtn = document.querySelector('.carousel-prev');

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(currentTestimonial);
            });

            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentTestimonial);
            });

            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(currentTestimonial);
            }, 7000);
        }
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('.form-input');
        const submitButton = document.getElementById('submit-button');
        const buttonText = document.getElementById('button-text');
        const loadingSpinner = document.getElementById('loading-spinner');

        function validateField(input) {
            const parent = input.closest('.form-group');
            const icon = parent.querySelector('.validation-icon');
            if (input.checkValidity()) {
                input.classList.remove('form-input-invalid');
                input.classList.add('form-input-valid');
                icon.innerHTML = '<i class="fas fa-check-circle text-green-500"></i>';
                return true;
            } else {
                input.classList.remove('form-input-valid');
                input.classList.add('form-input-invalid');
                icon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500"></i>';
                return false;
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => validateField(input));
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                buttonText.classList.add('hidden');
                loadingSpinner.classList.remove('hidden');
                submitButton.disabled = true;

                setTimeout(() => {
                    buttonText.classList.remove('hidden');
                    loadingSpinner.classList.add('hidden');
                    submitButton.disabled = false;
                    alert('Message sent successfully!');
                    contactForm.reset();
                    document.querySelectorAll('.validation-icon').forEach(icon => icon.innerHTML = '');
                    inputs.forEach(input => {
                        input.classList.remove('form-input-valid', 'form-input-invalid');
                    });
                }, 2000);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // Project Modals
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const projectId = this.dataset.project;
            const modal = document.getElementById(`modal-${projectId}`);
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('show'), 10);
            }
        });
    });

    const projectModalCloseButtons = document.querySelectorAll('.modal-close');
    projectModalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        });
    });

    // Close project modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            setTimeout(() => event.target.classList.add('hidden'), 300);
        }
    });

    // Service Modals
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            const serviceId = this.dataset.service;
            const modal = document.getElementById(`modal-${serviceId}`);
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('show'), 10);
            }
        });
    });

    const serviceModalCloseButtons = document.querySelectorAll('.modal-close');
    serviceModalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        });
    });

    // Close service modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            setTimeout(() => event.target.classList.add('hidden'), 300);
        }
    });
});
