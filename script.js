// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('#navbarMenu a');

    // Mengambil elemen typing text menggunakan ID yang kita tambahkan di index.html
    const dynamicTextElement = document.getElementById('dynamic-text');

    // --- Start of Theme Handling ---

    // Fungsi untuk mengatur tema dan memperbarui ikon
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);

        // Perbarui ikon berdasarkan tema yang baru
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // Muat tema yang tersimpan saat halaman dimuat
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Tema default jika tidak ada preferensi yang tersimpan (misal: 'light')
        setTheme('light');
    }

    // Toggle tema saat tombol diklik
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // --- End of Theme Handling ---


    // --- Start of Hamburger Menu Handling ---

    // Periksa apakah elemen hamburger dan navMenu ada sebelum menambahkan event listener
    if (hamburgerBtn && navbarMenu) {
        const hamburgerIcon = hamburgerBtn.querySelector('i');

        hamburgerBtn.addEventListener('click', () => {
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
            navbarMenu.classList.toggle('active'); // Menggunakan 'active' agar konsisten dengan CSS

            // Toggle ikon hamburger
            if (navbarMenu.classList.contains('active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-xmark'); // Ikon silang saat menu terbuka
            } else {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars'); // Ikon baris saat menu tertutup
            }
        });

        // Tutup menu mobile saat link diklik
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


    // --- Start of Typing Effect ---
    // Pastikan elemen dengan ID 'dynamic-text' ada di index.html
    if (dynamicTextElement) {
        const phrases = [
            "Beginner in Web Development",
            "Passionate About UI Design",
            "Always Learning",
            "Exploring New Technologies"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            dynamicTextElement.textContent = displayText;

            let typingSpeed = 150; // Kecepatan mengetik
            if (isDeleting) {
                typingSpeed = 75; // Lebih cepat saat menghapus
            }

            // Kondisi untuk beralih antara mengetik dan menghapus
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Selesai mengetik, tunggu sebentar lalu mulai menghapus
                typingSpeed = 1500; // Jeda sebelum menghapus (1.5 detik)
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Selesai menghapus, pindah ke frase berikutnya
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Loop kembali ke awal array
                typingSpeed = 500; // Jeda sebelum mulai mengetik frase baru (0.5 detik)
            }

            // Panggil fungsi ini lagi setelah jeda
            setTimeout(typeEffect, typingSpeed);
        }

        // Panggil fungsi untuk memulai efek mengetik saat DOM siap
        typeEffect();
    }
    // --- End of Typing Effect ---
});
