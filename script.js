// Select translatable elements and inputs
const translatable = document.querySelectorAll('[data-en][data-he]');
const inputs = document.querySelectorAll('[data-en-placeholder][data-he-placeholder]');
const toggleBtn = document.getElementById('lang-toggle');
const html = document.documentElement;

// Set language with smooth fade
function setLanguage(lang) {
    // Fade out elements
    translatable.forEach(el => el.style.opacity = 0);
    inputs.forEach(el => el.style.opacity = 0);

    setTimeout(() => {
        // Swap visible text
        translatable.forEach(el => {
            el.textContent = lang === 'en' ? el.dataset.en : el.dataset.he;
        });

        // Swap placeholders
        inputs.forEach(el => {
            el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.hePlaceholder;
        });

        // Update HTML lang and direction
        if (lang === 'he') {
            html.lang = 'he';
            html.dir = 'rtl';
        } else {
            html.lang = 'en';
            html.dir = 'ltr';
        }

        // Update toggle button label
        toggleBtn.textContent = lang === 'en' ? toggleBtn.dataset.he : toggleBtn.dataset.en;

        // Fade elements back in
        translatable.forEach(el => el.style.opacity = 1);
        inputs.forEach(el => el.style.opacity = 1);

        // Save language
        localStorage.setItem('lang', lang);
    }, 200);
}

// Toggle button click
toggleBtn.addEventListener('click', () => {
    const currentLang = html.lang === 'en' ? 'he' : 'en';
    setLanguage(currentLang);
});

// On load, apply saved language
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
});
