import * as api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {

    let currentUser = null;
    let winners = [];
    let winnerTickerAnimationId = null;

    const elements = {
        modalOverlay: document.getElementById('modal-overlay'),
        promoModal: document.getElementById('promo-modal'),
        loginModal: document.getElementById('login-modal'),
        registerModal: document.getElementById('register-modal'),
        
        signinBtn: document.getElementById('signin-btn'),
        signupBtn: document.getElementById('signup-btn'),
        logoutBtn: document.getElementById('logout-btn'),
        
        switchToRegisterBtn: document.getElementById('switch-to-register'),
        switchToLoginBtn: document.getElementById('switch-to-login'),
        
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        loginError: document.getElementById('login-error'),
        registerError: document.getElementById('register-error'),

        loggedOutView: document.getElementById('logged-out-view'),
        loggedInView: document.getElementById('logged-in-view'),
        usernameDisplay: document.getElementById('username-display'),

        countdownTimer: document.getElementById('countdown-timer'),

        heroSlider: document.getElementById('hero-slider'),
        heroPrev: document.getElementById('hero-prev'),
        heroNext: document.getElementById('hero-next'),
        heroDots: document.getElementById('hero-dots'),

        platformSelect: document.getElementById('platform-select'),
        quickDepositForm: document.getElementById('quick-deposit-form'),
        depositMessage: document.getElementById('deposit-message'),

        platformGrid: document.getElementById('platform-grid'),
        
        promoCarouselContainer: document.getElementById('promo-carousel-container'),
        promoCarouselPrev: document.getElementById('promo-carousel-prev'),
        promoCarouselNext: document.getElementById('promo-carousel-next'),

        hotGamesCarouselContainer: document.getElementById('hot-games-carousel-container'),
        hotGamesPrev: document.getElementById('hot-games-prev'),
        hotGamesNext: document.getElementById('hot-games-next'),
        
        winnersTicker: document.getElementById('winners-ticker'),

        footerLinksPages: document.getElementById('footer-links-pages'),
        footerLinksSoftware: document.getElementById('footer-links-software'),
        footerLinksPromotions: document.getElementById('footer-links-promotions'),
        footerPlatforms: document.getElementById('footer-platforms'),
    };

    const openModal = (modal) => {
        if (!modal) return;
        elements.modalOverlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        document.querySelectorAll('.app-modal').forEach(m => m.classList.add('hidden'));
        elements.modalOverlay.classList.add('hidden');
    };

    const setupWebSockets = () => {
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('connect_error', (err) => {
            console.error('WebSocket connection error:', err);
        });

        socket.on('new_winner', (newWinner) => {
            console.log('New winner received:', newWinner);
            winners.unshift(newWinner);
            if (winners.length > 20) {
                winners.pop();
            }
            renderWinnersTicker();
        });

        socket.on('happy_hour_start', () => {
            console.log('Happy Hour started!');
            openModal(elements.promoModal);
        });
    };

    elements.modalOverlay.addEventListener('click', closeModal);
    document.querySelectorAll('.modal-close-trigger').forEach(btn => btn.addEventListener('click', closeModal));
    



    const updateAuthUI = () => {
        if (currentUser) {
            elements.loggedOutView.classList.add('hidden');
            elements.loggedInView.classList.remove('hidden');
            elements.usernameDisplay.textContent = currentUser.username;
        } else {
            elements.loggedOutView.classList.remove('hidden');
            elements.loggedInView.classList.add('hidden');
            elements.usernameDisplay.textContent = '';
        }
    };
    
    const checkSession = () => {
        const user = localStorage.getItem('BIG WANG_user');
        if(user) {
            currentUser = JSON.parse(user);
            updateAuthUI();
        }
    };

    elements.signinBtn.addEventListener('click', () => openModal(elements.loginModal));
    elements.signupBtn.addEventListener('click', () => openModal(elements.registerModal));
    elements.switchToRegisterBtn.addEventListener('click', () => {
        closeModal();
        openModal(elements.registerModal);
    });
    elements.switchToLoginBtn.addEventListener('click', () => {
        closeModal();
        openModal(elements.loginModal);
    });

    elements.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        elements.loginError.classList.add('hidden');
        const email = elements.loginForm.querySelector('#login-email').value;
        const password = elements.loginForm.querySelector('#login-password').value;
        try {
            const user = await api.login(email, password);
            currentUser = user;
            localStorage.setItem('BIG WANG_user', JSON.stringify(user));
            updateAuthUI();
            closeModal();
        } catch (error) {
            elements.loginError.textContent = error.message;
            elements.loginError.classList.remove('hidden');
        }
    });
    
    elements.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        elements.registerError.classList.add('hidden');
        const username = elements.registerForm.querySelector('#register-username').value;
        const email = elements.registerForm.querySelector('#register-email').value;
        const password = elements.registerForm.querySelector('#register-password').value;
        try {
            const user = await api.register(username, email, password);
            currentUser = user;
            localStorage.setItem('BIG WANG_user', JSON.stringify(user));
            updateAuthUI();
            closeModal();
        } catch (error) {
            elements.registerError.textContent = error.message;
            elements.registerError.classList.remove('hidden');
        }
    });

    elements.logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('BIG WANG_user');
        updateAuthUI();
    });

    const startCountdown = () => {
        const countdownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000); // 2 days from now
        setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            elements.countdownTimer.innerHTML = `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`;
        }, 1000);
    };

    const setupCarousel = (container, prevBtn, nextBtn, items) => {
        let currentIndex = 0;
        const totalItems = items.length;
        const itemsVisible = window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 4);
        
        const updateCarousel = () => {
            container.style.transform = `translateX(-${currentIndex * (100 / totalItems)}%)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalItems - itemsVisible;
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(totalItems - itemsVisible, currentIndex + 1);
            updateCarousel();
        });
        
        updateCarousel();
    };

    const setupHeroSlider = (slides) => {
        let currentIndex = 0;
        elements.heroSlider.innerHTML = slides.map(slide => `
            <div class="w-full h-full flex-shrink-0 relative">
                <img src="${slide.imageUrl}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                    <h2 class="text-4xl md:text-6xl font-extrabold text-white mb-4">${slide.title}</h2>
                    <p class="text-lg md:text-xl text-gray-200 mb-8">${slide.subtitle}</p>
                    <a href="#" class="btn-primary">${slide.buttonText}</a>
                </div>
            </div>
        `).join('');

        elements.heroDots.innerHTML = slides.map((_, i) => `<button data-index="${i}" class="h-3 w-3 rounded-full bg-white/50 transition-colors duration-300"></button>`).join('');
        const dotButtons = elements.heroDots.querySelectorAll('button');

        const updateSlider = () => {
            elements.heroSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dotButtons.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === currentIndex);
                dot.classList.toggle('bg-white/50', i !== currentIndex);
            });
        };

        elements.heroPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        elements.heroNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        dotButtons.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                updateSlider();
            });
        });
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);

        updateSlider();
    };

    elements.quickDepositForm.addEventListener('submit', async e => {
        e.preventDefault();
        elements.depositMessage.classList.add('hidden');
        const platform = elements.platformSelect.value;
        const amount = document.getElementById('deposit-amount').value;
        const coupon = document.getElementById('coupon-code').value;

        try {
            const result = await api.submitDeposit(platform, amount, coupon);
            elements.depositMessage.textContent = result.message;
            elements.depositMessage.classList.remove('text-red-500');
            elements.depositMessage.classList.add('text-green-400');
        } catch(error) {
            elements.depositMessage.textContent = error.message;
            elements.depositMessage.classList.remove('text-green-400');
            elements.depositMessage.classList.add('text-red-500');
        } finally {
            elements.depositMessage.classList.remove('hidden');
        }
    });

    const loadPlatforms = async () => {
        const platforms = await api.getPlatforms();
        elements.platformGrid.innerHTML = platforms.map(p => `
            <a href="#" class="group block bg-secondary-dark rounded-xl p-4 text-center transition-all duration-300 hover:bg-yellow-400/10 hover:-translate-y-1">
                <img src="${p.imageUrl}" alt="${p.name}" class="h-20 mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
                <h3 class="font-bold text-lg text-white">${p.name}</h3>
            </a>
        `).join('');
        
        elements.platformSelect.innerHTML = platforms.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
        elements.footerPlatforms.innerHTML = platforms.map(p => `
            <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">
                <img src="${p.imageUrl}" alt="${p.name}" class="h-10">
            </a>
        `).join('');
    };
    
    const loadPromotions = async () => {
        const promotions = await api.getPromotions();
        elements.promoCarouselContainer.innerHTML = promotions.map(p => `
            <div class="px-3 flex-shrink-0" style="flex-basis: 50%; @media (min-width: 768px) { flex-basis: 33.33%; } @media (min-width: 1024px) { flex-basis: 25%; }">
                <div class="bg-primary-dark rounded-lg overflow-hidden group">
                    <img src="${p.imageUrl}" alt="${p.title}" class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105">
                    <div class="p-4">
                        <h3 class="font-bold text-lg text-yellow-400">${p.title}</h3>
                        <p class="text-sm text-gray-300">${p.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
        setupCarousel(elements.promoCarouselContainer, elements.promoCarouselPrev, elements.promoCarouselNext, promotions);
    };
    
    const loadHotGames = async () => {
        const games = await api.getHotGames();
        elements.hotGamesCarouselContainer.innerHTML = games.map(g => `
            <div class="px-3 flex-shrink-0" style="flex-basis: 50%; @media (min-width: 768px) { flex-basis: 33.33%; } @media (min-width: 1024px) { flex-basis: 25%; }">
                <div class="relative rounded-lg overflow-hidden group">
                    <img src="${g.imageUrl}" alt="${g.name}" class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 class="text-lg font-bold text-white">${g.name}</h3>
                        <p class="text-xs text-yellow-400">${g.platform}</p>
                    </div>
                </div>
            </div>
        `).join('');
        setupCarousel(elements.hotGamesCarouselContainer, elements.hotGamesPrev, elements.hotGamesNext, games);
    };

    const renderWinnersTicker = () => {
        if (winnerTickerAnimationId) {
            cancelAnimationFrame(winnerTickerAnimationId);
        }
        if (!elements.winnersTicker) return;

        const winnerHTML = winners.map(w => `
            <div class="flex items-center justify-between bg-secondary-dark p-3 rounded-lg mb-3">
                <div class="flex items-center space-x-3">
                    <i data-lucide="user-circle-2" class="text-yellow-400 w-6 h-6"></i>
                    <div>
                        <p class="font-semibold text-sm">${w.username}</p>
                        <p class="text-xs text-gray-400">in ${w.game}</p>
                    </div>
                </div>
                <p class="font-bold text-lg text-green-400">$${Number(w.amount).toFixed(2)}</p>
            </div>
        `).join('');
        
        elements.winnersTicker.innerHTML = winnerHTML + winnerHTML;
        lucide.createIcons();
        if (winners.length === 0) return;

        let top = 0;
        requestAnimationFrame(() => {
            const tickerHeight = elements.winnersTicker.scrollHeight / 2;
            if (tickerHeight === 0) return;

            function scrollTicker() {
                top -= 1;
                if (top <= -tickerHeight) {
                    top = 0;
                }
                elements.winnersTicker.style.transform = `translateY(${top}px)`;
                winnerTickerAnimationId = requestAnimationFrame(scrollTicker);
            }
            scrollTicker();
        });
    };

    const loadWinners = async () => {
        try {
            winners = await api.getRecentWinners();
            renderWinnersTicker();
        } catch (e) {
            console.error("Failed to load initial winners", e);
        }
    };

    const loadFooterLinks = async () => {
        const links = await api.getFooterLinks();
        const createLinks = (items) => items.map(l => `<a href="${l.href}" class="footer-link">${l.name}</a>`).join('');
        
        elements.footerLinksPages.innerHTML += createLinks(links.pages);
        elements.footerLinksSoftware.innerHTML += createLinks(links.software);
        elements.footerLinksPromotions.innerHTML += createLinks(links.promotions);
    };
    
    checkSession();
    setupWebSockets();
    startCountdown();
    api.getHeroSlides().then(setupHeroSlider);
    loadPlatforms();
    loadPromotions();
    loadHotGames();
    loadWinners();
    loadFooterLinks();
}
