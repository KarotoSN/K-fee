
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.querySelector('.theme-toggle');
        const body = document.body;
        
        // Vérifie si un thème est déjà enregistré
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        
        themeToggle.addEventListener('click', function() {
            // Bascule le mode sombre
            body.classList.toggle('dark-mode');
            
            // Enregistre le thème dans le localStorage
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    });
