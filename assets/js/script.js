 // Initialize Lucide icons
 lucide.createIcons();

 // Timer functionality
 let timeLeft = { hours: 23, minutes: 47, seconds: 32 };
 let memberCount = 2847;

 function updateTimer() {
    if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
    } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
    } else if (timeLeft.hours > 0) {
        timeLeft.hours--;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
    }

    document.getElementById('hours').textContent = timeLeft.hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = timeLeft.minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = timeLeft.seconds.toString().padStart(2, '0');
}

function updateMemberCount() {
    if (Math.random() > 0.7) {
        memberCount++;
        document.getElementById('member-count').textContent = memberCount.toLocaleString('pt-BR');
        document.getElementById('final-member-count').textContent = memberCount.toLocaleString('pt-BR');
    }
}

// WhatsApp join function
function joinWhatsApp() {
    // Substitua pelo seu link real do WhatsApp
    const whatsappLink = 'https://wa.me/5511999999999?text=Quero%20participar%20do%20grupo%20Promo%20Home';
    window.open(whatsappLink, '_blank');
    
    // Analytics tracking (opcional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': 'WhatsApp Join'
        });
    }
}

// Start timers
setInterval(updateTimer, 1000);
setInterval(updateMemberCount, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.benefit-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});