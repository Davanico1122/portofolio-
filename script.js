const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeIcon.localName = savedTheme === 'dark' ? ' fas fa-sun ' : 'fas fa-moon';

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.localName = newTheme === 'dark' ? 'fas fa-sun ' : 'fas fa-moon';
});

const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navbarMenu');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
    hamburgerIcon.classList.toggle('fa-bars');
    hamburgerIcon.classList.remove('fa-xmark');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
            hamburgerIcon.classList.add('fa-bars');
            hamburgerIcon.classList.remove('fa-xmark');
        }
    });
});
