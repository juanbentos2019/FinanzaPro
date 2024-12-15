document.addEventListener('DOMContentLoaded', () => {
    truncateArticleSummaries();
    inicializarEventListeners();
    inicializarScrollToTop();
    inicializarAnimacionesScroll();
    aplicarFadeIn();
});

function truncateArticleSummaries() {
    const summaries = document.querySelectorAll('.article-summary');
    summaries.forEach(summary => {
        const fullText = summary.textContent.trim();
        if (fullText.length > 35) {
            summary.textContent = fullText.substring(0, 35) + '...';
        } else if (fullText.length === 0) {
            const articleTitle = summary.closest('.blog-card').querySelector('h2').textContent;
            summary.textContent = `Resumen del artículo "${articleTitle}"...`;
        }
    });
}

function inicializarEventListeners() {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('burger-active');
        animateNavLinks();
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        });
    });

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

function inicializarScrollToTop() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function inicializarAnimacionesScroll() {
    const cards = document.querySelectorAll('.blog-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden-right');
            } else {
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('hidden-right');
                } else {
                    entry.target.classList.remove('visible');
                    entry.target.classList.remove('hidden-right');
                }
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

function aplicarFadeIn() {
    setTimeout(function() {
        document.body.classList.add('fade-in');
    }, 100);
}

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});