document.addEventListener('DOMContentLoaded', function() {
    // Setup menu tabs
    setupMenuTabs();
    
    // Initialize animations
    initMenuAnimations();
});

// Handle menu tab switching
function setupMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the category to show
            const categoryId = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show selected category, hide others
            menuCategories.forEach(category => {
                if (category.id === categoryId) {
                    category.classList.add('active');
                    // Trigger animations for newly visible elements
                    animateVisibleElements(category);
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });
}

// Initialize animations for the menu page
function initMenuAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-up-delay, .reveal-left, .reveal-right');
    
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
    });
    
    // Trigger once on load for above-the-fold elements
    setTimeout(() => {
        document.dispatchEvent(new Event('scroll'));
    }, 100);
}

// Animate elements within a newly visible category
function animateVisibleElements(container) {
    const elements = container.querySelectorAll('.reveal-up, .reveal-up-delay, .reveal-left, .reveal-right');
    
    // Reset animations
    elements.forEach(el => {
        el.classList.remove('revealed');
        
        // Force a reflow to restart animations
        void el.offsetWidth;
        
        // Add the revealed class with a slight delay between elements
        setTimeout(() => {
            el.classList.add('revealed');
        }, 50);
    });
}