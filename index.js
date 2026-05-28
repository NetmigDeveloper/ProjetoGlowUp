/* /ProjetoGlowUp/index.js */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerBtn');
    const headerNav = document.getElementById('headerNav');
    const menuOverlay = document.getElementById('menuOverlay');

    function setMenuState(isOpen) {
        if (!hamburger || !headerNav) return;

        headerNav.classList.toggle('active', isOpen);
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

        if (menuOverlay) {
            menuOverlay.classList.toggle('active', isOpen);
        }

        document.body.classList.toggle('nav-open', isOpen);
    }

    if (hamburger && headerNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = !headerNav.classList.contains('active');
            setMenuState(isOpen);
        });

        headerNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            setMenuState(false);
        });
    }

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });

    const header = document.getElementById('header');

    function updateHeaderOnScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

    const yearSpan = document.getElementById('currentYear');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('revealed'));
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => observer.observe(el));
        }
    }

    function getWhatsappMessage(type) {
        const defaultText = 'Olá! 😊 Vi o site da Netmig e gostaria de saber mais sobre os planos disponíveis. Pode me ajudar?';

        const messages = {
            'geral': 'Olá! 😊 Vi o site da Netmig e queria tirar algumas dúvidas sobre os planos. Pode me ajudar?',
            'cobertura': 'Olá! 😊 Gostaria de consultar se a Netmig atende meu endereço. Pode verificar a cobertura pra mim?',
            'plano-600': 'Olá! 😊 Tenho interesse no Plano 600 Mega da Netmig. Pode verificar se ele está disponível no meu endereço?',
            'plano-800': 'Olá! 😊 Gostei do Plano 800 Mega da Netmig e queria saber mais detalhes para contratar.',
            'plano-1000': 'Olá! 🚀 Tenho interesse no Plano 1 Giga da Netmig. Pode me ajudar com a contratação?',
            'servico-cameras': 'Olá! 😊 Gostaria de saber mais sobre a locação de câmeras da Netmig. Pode me passar um orçamento?',
            'servico-ponto': 'Olá! 😊 Preciso de um ponto adicional de internet. Pode me orientar sobre valores e disponibilidade?',
            'servico-telefone': 'Olá! 😊 Tenho interesse no serviço de telefone fixo da Netmig. Pode me passar mais informações?',
            'chip-movel': 'Olá! 😊 Quero saber mais sobre os planos móveis da Netmig e a portabilidade grátis.'
        };

        return messages[type] || defaultText;
    }

    function openWhatsapp(button) {
        const phone = '553123320000';
        const type = button.getAttribute('data-whatsapp');

        if (!type) return;

        const message = getWhatsappMessage(type);
        const encoded = encodeURIComponent(message);
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;

        window.open(url, '_blank', 'noopener,noreferrer');
    }

    document.querySelectorAll('[data-whatsapp]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsapp(this);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || !href) return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            setMenuState(false);

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});
