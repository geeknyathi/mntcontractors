/* ============================================
   MNT CONTRACTORS - JAVASCRIPT
   Interactive Features, Dark Mode, Animations
   ============================================ */

// DARK MODE TOGGLE
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.htmlElement = document.documentElement;
        this.themeName = 'mnt-theme';
        this.init();
    }

    init() {
        this.loadTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateThemeLabel();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(this.themeName) || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.body.className = `${theme}-mode`;
        localStorage.setItem(this.themeName, theme);
        this.updateThemeLabel();
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem(this.themeName) || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeLabel() {
        const currentTheme = localStorage.getItem(this.themeName) || 'light';
        this.themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// MOBILE MENU TOGGLE
class MobileMenuManager {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleOutsideClick(e) {
        if (!e.target.closest('.navbar')) {
            this.closeMenu();
        }
    }
}

// PORTFOLIO FILTER
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        if (this.filterButtons.length === 0) return;

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.filterPortfolio(btn));
        });
    }

    filterPortfolio(btn) {
        const filter = btn.dataset.filter;

        // Update active button
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        this.portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// SMOOTH SCROLL FOR ANCHOR LINKS
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e, anchor));
        });
    }

    smoothScroll(e, anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// INTERSECTION OBSERVER FOR ANIMATIONS
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.service-card, .process-step, .testimonial-card, .portfolio-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// ACTIVE NAVIGATION LINK
class ActiveNavLink {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }

    updateActiveLink() {
        const current = window.location.pathname;
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if ((current === '/' || current.includes('index')) && href === '/') {
                link.classList.add('active');
            } else if (current.includes(href) && href !== '/') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// FORM VALIDATION
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        if (!this.validateForm()) {
            e.preventDefault();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, 'Please enter a valid email');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(input, message) {
        input.classList.add('error');
        let errorMsg = input.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            input.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    clearError(input) {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
}

// SCROLL TO TOP BUTTON
class ScrollToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }

    createButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'scroll-to-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(btn);
        return btn;
    }

    init() {
        window.addEventListener('scroll', () => this.toggleButton());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleButton() {
        if (window.scrollY > 300) {
            this.button.style.display = 'block';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// COUNTER ANIMATION
class CounterAnimation {
    constructor(selector) {
        this.counters = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.counters.forEach(counter => observer.observe(counter));
    }

    startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const increment = target / 30;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    }
}

// LAZY LOADING IMAGES
class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// ANALYTICS TRACKING
class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackPhoneCalls();
        this.trackEmailClicks();
        this.trackWhatsAppClicks();
        this.trackCTAClicks();
    }

    trackPhoneCalls() {
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('Phone Call', link.getAttribute('href'));
            });
        });
    }

    trackEmailClicks() {
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('Email Click', link.getAttribute('href'));
            });
        });
    }

    trackWhatsAppClicks() {
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('WhatsApp Click', 'WhatsApp');
            });
        });
    }

    trackCTAClicks() {
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('CTA Click', btn.textContent.trim());
            });
        });
    }

    trackEvent(category, action) {
        if (window.gtag) {
            gtag('event', action, {
                'event_category': category
            });
        }
        // Fallback: console log for debugging
        console.log('Tracked Event:', { category, action });
    }
}

// PERFORMANCE MONITORING
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('PerformanceObserver' in window) {
            this.monitorLargestContentfulPaint();
            this.monitorFirstInput();
        }
    }

    monitorLargestContentfulPaint() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP monitoring not supported');
        }
    }

    monitorFirstInput() {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('FID:', entry.processingDuration);
                }
            });
            observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID monitoring not supported');
        }
    }
}

// ACCESSIBILITY FEATURES
class AccessibilityFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipLink();
        this.enableKeyboardNavigation();
        this.announceChanges();
    }

    addSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('main-content').focus();
            });
        }
    }

    enableKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    }

    announceChanges() {
        const liveRegion = document.createElement('div');
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }
}

// SEO STRUCTURED DATA
class StructuredData {
    constructor() {
        this.init();
    }

    init() {
        this.addOrganizationSchema();
        this.addLocalBusinessSchema();
        this.addServiceSchema();
    }

    addOrganizationSchema() {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'MNT Contractors',
            'url': 'https://mntcontractors.co.zw',
            'logo': 'https://mntcontractors.co.zw/assets/logo.png',
            'description': 'Zimbabwe\'s leading ceiling installation and interior solutions provider',
            'sameAs': [
                'https://www.facebook.com/profile.php?id=100083298612887',
                'https://www.instagram.com/mnt.contractors/'
            ]
        };
        this.addSchema(schema);
    }

    addLocalBusinessSchema() {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'MNT Contractors',
            'image': 'https://mntcontractors.co.zw/assets/logo.png',
            'description': 'Professional ceiling installation, skimming, tiling and TV wall design services',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': '4904 Budiriro 3',
                'addressLocality': 'Harare',
                'addressRegion': 'Zimbabwe',
                'postalCode': '',
                'addressCountry': 'ZW'
            },
            'telephone': '+263716675086',
            'email': 'sales@mntcontractors.co.zw'
        };
        this.addSchema(schema);
    }

    addServiceSchema() {
        const services = [
            'Commercial Ceilings',
            'Residential Ceilings',
            'Suspended Ceilings',
            'Professional Skimming',
            'Tiling Services',
            'TV Wall Design'
        ];

        services.forEach(service => {
            const schema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                'name': service,
                'provider': {
                    '@type': 'LocalBusiness',
                    'name': 'MNT Contractors'
                },
                'areaServed': 'ZW'
            };
            this.addSchema(schema);
        });
    }

    addSchema(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
}

// INITIALIZE ALL FEATURES ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core features
    new ThemeManager();
    new MobileMenuManager();
    new PortfolioFilter();
    new SmoothScroll();
    new ActiveNavLink();
    new AnimationObserver();
    new ScrollToTop();
    new LazyLoadImages();
    new AnalyticsTracker();
    new AccessibilityFeatures();
    new StructuredData();

    // Initialize forms if they exist
    new FormValidator('form');

    // Initialize contact form handler with Web3Forms
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const data = {
                    access_key: "a507aea5-1730-4b07-a173-b7cf0da94125",
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    service: formData.get('service'),
                    message: formData.get('message'),
                    subject: 'New Contact Form Submission - MNT Contractors'
                };
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Message sent successfully!\n\nThank you for contacting MNT Contractors. We will get back to you shortly.');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                alert('✗ Sorry, there was an error sending your message.\n\nPlease try calling us directly at +263 71 667 5086 or WhatsApp us.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Log initialization
    console.log('MNT Contractors - All features initialized');
});

// ADDITIONAL UTILITY FUNCTIONS

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get element offset from top
 */
function getElementOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add loading animation to buttons
 */
function addLoadingAnimation(button) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Loading...';
}

/**
 * Remove loading animation from buttons
 */
function removeLoadingAnimation(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        getElementOffset,
        isElementInViewport,
        addLoadingAnimation,
        removeLoadingAnimation
    };
}
