/* ==============================================
   JAVASCRIPT PARA LANDING PAGE TOP PROMOS
   Funcionalidades implementadas:
   - Validação de formulário em tempo real
   - Countdown de urgência
   - Animações e micro-interações
   - Scroll suave e menu responsivo
   - Modal de sucesso
   - Tracking de conversões
   ============================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // INICIALIZAÇÃO DOS COMPONENTES
    // ==============================================
    initFormValidation();
    initCountdown();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    
    console.log('🔥 Top Promos - Landing Page carregada com sucesso!');
});

// ==============================================
// VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL
// Estratégia: Feedback imediato melhora conversão
// ==============================================
function initFormValidation() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const whatsappInput = document.getElementById('whatsapp');
    const emailInput = document.getElementById('email');
    const termsInput = document.getElementById('terms');
    
    if (!form) return;
    
    // Máscara para WhatsApp - melhora UX
    whatsappInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
        
        // Validação em tempo real
        validateWhatsApp(e.target);
    });
    
    // Validações em tempo real para todos os campos
    nameInput.addEventListener('blur', () => validateName(nameInput));
    nameInput.addEventListener('input', () => clearError('nameError'));
    
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    emailInput.addEventListener('input', () => clearError('emailError'));
    
    termsInput.addEventListener('change', () => validateTerms(termsInput));
    
    // Submissão do formulário
    form.addEventListener('submit', handleFormSubmit);
}

// Função de validação do nome
function validateName(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('nameError');
    
    if (value.length < 2) {
        showError(input, errorElement, 'Nome deve ter pelo menos 2 caracteres');
        return false;
    }
    
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
        showError(input, errorElement, 'Nome deve conter apenas letras');
        return false;
    }
    
    showSuccess(input, errorElement);
    return true;
}

// Função de validação do WhatsApp
function validateWhatsApp(input) {
    const value = input.value.replace(/\D/g, '');
    const errorElement = document.getElementById('whatsappError');
    
    if (value.length < 10) {
        showError(input, errorElement, 'WhatsApp deve ter pelo menos 10 dígitos');
        return false;
    }
    
    if (value.length > 11) {
        showError(input, errorElement, 'WhatsApp deve ter no máximo 11 dígitos');
        return false;
    }
    
    showSuccess(input, errorElement);
    return true;
}

// Função de validação do email
function validateEmail(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(input, errorElement, 'Digite um e-mail válido');
        return false;
    }
    
    showSuccess(input, errorElement);
    return true;
}

// Função de validação dos termos
function validateTerms(input) {
    const errorElement = document.getElementById('termsError');
    
    if (!input.checked) {
        showError(input, errorElement, 'Você deve concordar com os termos');
        return false;
    }
    
    clearError('termsError');
    return true;
}

// Função para mostrar erro
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Função para mostrar sucesso
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Função para limpar erro
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// ==============================================
// SUBMISSÃO DO FORMULÁRIO
// Estratégia: Feedback visual durante processo
// ==============================================
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const nameInput = document.getElementById('name');
    const whatsappInput = document.getElementById('whatsapp');
    const emailInput = document.getElementById('email');
    const termsInput = document.getElementById('terms');
    
    // Validar todos os campos
    const isNameValid = validateName(nameInput);
    const isWhatsAppValid = validateWhatsApp(whatsappInput);
    const isEmailValid = validateEmail(emailInput);
    const isTermsValid = validateTerms(termsInput);
    
    if (!isNameValid || !isWhatsAppValid || !isEmailValid || !isTermsValid) {
        // Scroll para o primeiro erro
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Mostrar loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simular envio (substituir por integração real)
    setTimeout(() => {
        // Dados do formulário
        const formData = {
            name: nameInput.value.trim(),
            whatsapp: whatsappInput.value,
            email: emailInput.value.trim(),
            timestamp: new Date().toISOString(),
            source: 'landing-page'
        };
        
        console.log('📝 Dados capturados:', formData);
        
        // Aqui você integraria com sua API/webhook
        // Exemplo: sendToAPI(formData);
        
        // Simular sucesso
        showSuccessModal();
        
        // Reset do formulário
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Tracking de conversão (integrar com Google Analytics, Facebook Pixel, etc.)
        trackConversion('form_submit', formData);
        
    }, 2000); // Simula tempo de processamento
}

// ==============================================
// MODAL DE SUCESSO
// Estratégia: Reforça a conversão e próximos passos
// ==============================================
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-focus no botão para acessibilidade
        const button = modal.querySelector('.btn-primary');
        if (button) {
            setTimeout(() => button.focus(), 300);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Função para mostrar modal de exit intent
function showExitIntentModal() {
    // Por enquanto, reutiliza o modal de sucesso
    // Pode ser customizado no futuro com um modal específico
    showSuccessModal();
}

// Fechar modal clicando fora
document.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==============================================
// COUNTDOWN DE URGÊNCIA
// Estratégia: Cria senso de escassez temporal
// ==============================================
function initCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Definir tempo final (24 horas a partir de agora)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // Reiniciar countdown quando chegar a zero
            const newEndTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            updateCountdownDisplay(newEndTime - new Date().getTime());
            return;
        }
        
        updateCountdownDisplay(timeLeft);
    }
    
    function updateCountdownDisplay(timeLeft) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Efeito visual quando os números mudam
        [hoursElement, minutesElement, secondsElement].forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        });
    }
    
    // Atualizar a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==============================================
// ANIMAÇÕES DE SCROLL
// Estratégia: Engajamento visual progressivo
// ==============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .testimonial-card, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// ==============================================
// MENU MOBILE
// Estratégia: Navegação otimizada para conversão
// ==============================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (!menuBtn || !nav) return;
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Animar ícone do menu
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (menuBtn.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
    
    // Fechar menu ao clicar em link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// ==============================================
// SCROLL SUAVE PARA ÂNCORAS
// Estratégia: Melhora UX e guia conversão
// ==============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Tracking de clique em CTA
                if (targetId === '#entrar') {
                    trackConversion('cta_click', { 
                        cta_location: this.closest('section')?.className || 'unknown',
                        cta_text: this.textContent.trim()
                    });
                }
            }
        });
    });
}

// ==============================================
// TRACKING DE CONVERSÕES
// Estratégia: Medir e otimizar performance
// ==============================================
function trackConversion(eventName, data = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            custom_parameter_1: data.source || 'landing-page',
            custom_parameter_2: data.timestamp || new Date().toISOString()
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, data);
    }
    
    // Console log para debug
    console.log('📊 Conversão rastreada:', eventName, data);
    
    // Aqui você pode adicionar outros pixels de tracking:
    // - Google Ads
    // - TikTok Pixel
    // - LinkedIn Insight Tag
    // - Pinterest Tag
    // etc.
}

// ==============================================
// OTIMIZAÇÕES DE PERFORMANCE
// ==============================================

// Lazy loading para elementos não críticos
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                element.src = src;
                element.removeAttribute('data-lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Debounce para eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==============================================
// FUNCIONALIDADES EXTRAS PARA CONVERSÃO
// ==============================================

// Exit Intent - mostrar oferta especial quando usuário vai sair
function initExitIntent() {
    let hasShownExitIntent = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !hasShownExitIntent) {
            hasShownExitIntent = true;
            showExitIntentModal();
        }
    });
}

// Timer de permanência na página
let pageStartTime = Date.now();
let timeOnPage = 0;

setInterval(() => {
    timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
    
    // Tracking de engajamento por tempo
    if (timeOnPage === 30) {
        trackConversion('engagement_30s');
    } else if (timeOnPage === 60) {
        trackConversion('engagement_1min');
    } else if (timeOnPage === 120) {
        trackConversion('engagement_2min');
    }
}, 1000);

// ==============================================
// INTEGRAÇÃO COM APIS EXTERNAS
// ==============================================

// Função para enviar dados para webhook/API
async function sendToAPI(formData) {
    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        
        const result = await response.json();
        console.log('✅ Dados enviados com sucesso:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Erro ao enviar dados:', error);
        // Implementar fallback ou retry logic
        throw error;
    }
}

// ==============================================
// ACESSIBILIDADE
// ==============================================

// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ==============================================
// PWA - PROGRESSIVE WEB APP (OPCIONAL)
// ==============================================

// Service Worker para cache offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('SW falhou ao registrar:', registrationError);
            });
    });
}

// ==============================================
// FUNÇÕES UTILITÁRIAS
// ==============================================

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Detectar se está online
function isOnline() {
    return navigator.onLine;
}

// Formatação de telefone brasileira
function formatPhoneBR(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Validação de CPF (caso necessário no futuro)
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Log de performance
console.log('⚡ Top Promos Landing Page carregada em:', 
    (performance.now() / 1000).toFixed(2) + 's');

// ==============================================
// INICIALIZAÇÃO FINAL
// ==============================================
window.addEventListener('load', () => {
    // Inicializar funcionalidades extras após carregamento completo
    initLazyLoading();
    initExitIntent();
    
    // Remover loading screen se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    console.log('🚀 Todas as funcionalidades carregadas!');
});