document.addEventListener('DOMContentLoaded', () => {
    inicializarEventListeners();
    inicializarWhatsApp();
});

function inicializarEventListeners() {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('burger-active');
        animateNavLinks();
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        }
    });
}

function animateNavLinks() {
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

function inicializarWhatsApp() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const customDialog = document.getElementById('custom-dialog');
    const dialogMessage = document.getElementById('dialog-message');
    const dialogCancel = document.getElementById('dialog-cancel');
    const dialogConfirm = document.getElementById('dialog-confirm');

    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialogMessage.textContent = '¿Deseas enviar un mensaje por WhatsApp?';
        customDialog.style.display = 'block';
    });

    dialogCancel.addEventListener('click', () => {
        customDialog.style.display = 'none';
    });

    dialogConfirm.addEventListener('click', () => {
        window.open('https://wa.me/1234567890', '_blank');
        customDialog.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === customDialog) {
            customDialog.style.display = 'none';
        }
    });
}