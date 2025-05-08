document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated elements
    initAnimations();
    
    // Setup theme switcher
    setupThemeToggle();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup hero title animation
    animateHeroTitle();
    
    // Setup product card flip
    setupProductCards();
    
    // Setup product carousel
    setupProductCarousel();
    
    // Update year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Setup scroll behavior
    setupScrollBehavior();
});

// Initialize animations when elements come into view
function initAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-up-delay, .reveal-up-delay-2, .reveal-up-delay-3, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
        // Add initial state
        if (el.classList.contains('reveal-up') || el.classList.contains('reveal-up-delay') || el.classList.contains('reveal-up-delay-2') || el.classList.contains('reveal-up-delay-3')) {
            el.style.transform = 'translateY(40px)';
            el.style.opacity = '0';
            el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        } else if (el.classList.contains('reveal-left')) {
            el.style.transform = 'translateX(-40px)';
            el.style.opacity = '0';
            el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        } else if (el.classList.contains('reveal-right')) {
            el.style.transform = 'translateX(40px)';
            el.style.opacity = '0';
            el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        }
        
        // Add different delay for each type
        if (el.classList.contains('reveal-up-delay')) {
            el.style.transitionDelay = '0.2s';
        } else if (el.classList.contains('reveal-up-delay-2')) {
            el.style.transitionDelay = '0.4s';
        } else if (el.classList.contains('reveal-up-delay-3')) {
            el.style.transitionDelay = '0.6s';
        }
    });
    
    // Add revealed class when the element is in view
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.revealed').forEach(el => {
            el.style.transform = 'translate(0)';
            el.style.opacity = '1';
        });
    }, { passive: true });
    
    // Trigger once on load for above-the-fold elements
    setTimeout(() => {
        document.dispatchEvent(new Event('scroll'));
    }, 100);
}

// Setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = mobileNav.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        menuIcon.style.display = isExpanded ? 'none' : 'block';
        closeIcon.style.display = isExpanded ? 'block' : 'none';
    });
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
}

// Animate hero title with letter by letter effect
function animateHeroTitle() {
    const title = document.getElementById('animated-title');
    if (!title) return;
    
    const text = title.textContent;
    let html = '';
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            html += ' ';
        } else {
            html += `<span class="animated-letter" style="animation-delay: ${0.05 * i}s">${text[i]}</span>`;
        }
    }
    
    title.innerHTML = html;
}

// Setup product cards
function setupProductCards() {
    const flipButtons = document.querySelectorAll('.product-flip-btn');
    const flipBackButtons = document.querySelectorAll('.product-flip-back');
    
    flipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            card.classList.add('flipped');
        });
    });
    
    flipBackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            card.classList.remove('flipped');
        });
    });
}

// Setup product carousel
function setupProductCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.product-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].clientWidth;
    
    // Update the dots and carousel position
    function updateCarousel() {
        // Update the transform
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        
        // Update the active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Set up event listeners for controls
    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        updateCarousel();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Initialize the carousel
    updateCarousel();
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) { // Swipe left
                currentIndex = Math.min(cards.length - 1, currentIndex + 1);
            } else { // Swipe right
                currentIndex = Math.max(0, currentIndex - 1);
            }
            updateCarousel();
        }
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate card width after resize
        const newCardWidth = cards[0].clientWidth;
        if (newCardWidth !== cardWidth) {
            track.style.transform = `translateX(${-currentIndex * newCardWidth}px)`;
        }
    });
}

// Setup scroll behavior
function setupScrollBehavior() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class to change header appearance
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without reload
                history.pushState(null, null, targetId);
            }
        });
    });
}
