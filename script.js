// script.js

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Start of Theme Handling ---

    const themeToggleBtn = document.getElementById('themeToggle');
    // Pindahkan inisialisasi themeIcon ke dalam pengecekan themeToggleBtn
    let themeIcon; 
    if (themeToggleBtn) {
        themeIcon = themeToggleBtn.querySelector('i');
    }

    // Fungsi untuk mengatur tema dan memperbarui ikon
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);

        // Perbarui ikon berdasarkan tema yang baru
        if (themeIcon) { // Pastikan themeIcon ditemukan sebelum memanipulasinya
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
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
    if (themeToggleBtn) { // Pastikan tombol ada sebelum menambahkan event listener
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // --- End of Theme Handling ---


    // --- Start of Hamburger Menu Handling ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');

    // Periksa apakah elemen hamburger dan navMenu ada sebelum menambahkan event listener
    if (hamburgerBtn && navbarMenu) {
        const hamburgerIcon = hamburgerBtn.querySelector('i');
        const navLinks = document.querySelectorAll('#navbarMenu a'); // Inisialisasi di sini

        hamburgerBtn.addEventListener('click', () => {
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
            navbarMenu.classList.toggle('active'); // Menggunakan 'active' agar konsisten dengan CSS

            // Toggle ikon hamburger
            if (hamburgerIcon) { // Pastikan ikon hamburger ditemukan
                if (navbarMenu.classList.contains('active')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-xmark'); // Ikon silang saat menu terbuka
                } else {
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars'); // Ikon baris saat menu tertutup
                }
            }
        });

        // Tutup menu mobile saat link diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    if (hamburgerIcon) { // Pastikan ikon hamburger ditemukan
                        hamburgerIcon.classList.remove('fa-xmark'); // Pastikan ikon kembali ke baris
                        hamburgerIcon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // --- End of Hamburger Menu Handling ---


    // --- Start of Typing Effect ---
    const dynamicTextElement = document.getElementById('dynamic-text'); // Inisialisasi di sini

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

    // --- Start of Nav Link Active (Scroll Spy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a'); // Mendefinisikan ulang untuk scroll spy

    function activateNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Sesuaikan offset jika perlu

            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector('nav ul li a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Hapus 'active' dari semua link, lalu tambahkan ke link yang sesuai
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    // Panggil sekali saat dimuat untuk mengatur link aktif di awal
    activateNavLink();
    // --- End of Nav Link Active (Scroll Spy) ---

});
