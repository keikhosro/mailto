// Initialize translations
function initializeI18n() {
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = chrome.i18n.getMessage(key);
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = chrome.i18n.getMessage(key);
    });
}

// Load saved settings
function loadSettings() {
    chrome.storage.sync.get(['defaultEmails', 'defaultBehavior'], function (result) {
        document.getElementById('defaultEmails').value = result.defaultEmails || '';
        document.getElementById('defaultBehavior').value = result.defaultBehavior || 'blank';
    });
}

// Validate email address
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// Save settings
function saveSettings() {
    const defaultEmails = document.getElementById('defaultEmails').value.trim();
    const status = document.getElementById('status');

    // If empty, save and return
    if (defaultEmails.length === 0) {
        const defaultBehavior = document.getElementById('defaultBehavior').value;
        chrome.storage.sync.set({
            defaultEmails: '',
            defaultBehavior: defaultBehavior
        }, function () {
            status.textContent = chrome.i18n.getMessage('settingsSaved');
            status.style.color = '#4CAF50';
            setTimeout(function () {
                status.textContent = '';
            }, 2000);
        });
        return;
    }

    // Validate email addresses
    const emails = defaultEmails.split(',').map(email => email.trim());
    const invalidEmails = emails.filter(email => email && !isValidEmail(email));

    if (invalidEmails.length > 0) {
        status.textContent = `${chrome.i18n.getMessage('invalidEmails')} ${invalidEmails.join(', ')}`;
        status.style.color = '#f44336';
        return;
    }

    // Save valid emails
    const defaultBehavior = document.getElementById('defaultBehavior').value;
    chrome.storage.sync.set({
        defaultEmails: emails.join(', '),
        defaultBehavior: defaultBehavior
    }, function () {
        // Update context menus when settings change
        chrome.runtime.sendMessage({action: 'updateMenus'});

        status.textContent = chrome.i18n.getMessage('settingsSaved');
        status.style.color = '#4CAF50';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeI18n();
    loadSettings();
});
document.getElementById('save').addEventListener('click', saveSettings);
document.getElementById('closeButton').addEventListener('click', function () {
    window.close();
});
