// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i'); // Mengambil elemen <i> di dalam tombol
    const body = document.body; // Menggunakan document.body untuk atribut data-theme
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('#navbarMenu a');
    const typingTextElement = document.querySelector('.typing-text'); // Pastikan ini ada di index.html

    // --- Start of Theme Handling ---

    // Function to set theme and update icon
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme); // Perbaiki: gunakan setItem untuk localStorage

        // Perbarui ikon berdasarkan tema yang baru
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('selectedTheme'); // Perbaiki: menggunakan key 'selectedTheme'
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default theme if no preference is saved (misal: 'light' jika tidak ada preferensi)
        // Jika body Anda di HTML defaultnya 'light', maka ini akan konsisten
        setTheme('light'); 
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // --- End of Theme Handling ---


    // --- Start of Hamburger Menu Handling ---

    // Periksa apakah elemen hamburger dan navMenu ada sebelum menambahkan event listener
    if (hamburgerBtn && navbarMenu) {
        const hamburgerIcon = hamburgerBtn.querySelector('i'); // Mengambil elemen <i> di dalam tombol hamburger

        hamburgerBtn.addEventListener('click', () => {
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
            navbarMenu.classList.toggle('active'); // Ganti 'open' menjadi 'active' agar konsisten dengan CSS yang biasa
            
            // Toggle ikon hamburger
            if (navbarMenu.classList.contains('active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-xmark'); // Ikon silang saat menu terbuka
            } else {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars'); // Ikon baris saat menu tertutup
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    hamburgerIcon.classList.remove('fa-xmark'); // Pastikan ikon kembali ke baris
                    hamburgerIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- End of Hamburger Menu Handling ---


    // --- Start of Typing Effect (from your original code) ---
    // Pastikan elemen dengan class 'typing-text' ada di index.html
    if (typingTextElement) {
        const texts = ["Beginner in Web Development", "Passionate About UI Design", "Always Learning"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const typingSpeed = isDeleting ? 50 : 150;
            setTimeout(type, typingSpeed);
        }
        type();
    }
    // --- End of Typing Effect ---
});
