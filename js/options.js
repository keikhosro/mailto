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
    chrome.storage.sync.get(['defaultEmails', 'defaultCC', 'defaultBCC', 'defaultSubject', 'defaultBody', 'defaultBehavior'], function (result) {
        document.getElementById('defaultEmails').value = result.defaultEmails || '';
        document.getElementById('defaultCC').value = result.defaultCC || '';
        document.getElementById('defaultBCC').value = result.defaultBCC || '';
        document.getElementById('defaultSubject').value = result.defaultSubject || '';
        document.getElementById('defaultBody').value = result.defaultBody || '';
        document.getElementById('defaultBehavior').value = result.defaultBehavior || 'blank';
    });
}

// Validate email address
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// Validate email list
function validateEmailList(emailString) {
    if (!emailString || emailString.trim().length === 0) {
        return {valid: true, invalidEmails: []};
    }

    const emails = emailString.split(',').map(email => email.trim());
    const invalidEmails = emails.filter(email => email && !isValidEmail(email));

    return {
        valid: invalidEmails.length === 0,
        invalidEmails: invalidEmails
    };
}

// Insert token into a text field at cursor position
function insertToken(fieldId, token) {
    const field = document.getElementById(fieldId);
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    const text = field.value;

    field.value = text.substring(0, startPos) + token + text.substring(endPos);

    // Set cursor position after the inserted token
    const newPos = startPos + token.length;
    field.setSelectionRange(newPos, newPos);
    field.focus();
}

// Save settings
function saveSettings() {
    const defaultEmails = document.getElementById('defaultEmails').value.trim();
    const defaultCC = document.getElementById('defaultCC').value.trim();
    const defaultBCC = document.getElementById('defaultBCC').value.trim();
    const defaultSubject = document.getElementById('defaultSubject').value.trim();
    const defaultBody = document.getElementById('defaultBody').value.trim();
    const status = document.getElementById('status');

    // Validate all email fields
    const toValidation = validateEmailList(defaultEmails);
    const ccValidation = validateEmailList(defaultCC);
    const bccValidation = validateEmailList(defaultBCC);

    const allInvalidEmails = [
        ...toValidation.invalidEmails,
        ...ccValidation.invalidEmails,
        ...bccValidation.invalidEmails
    ];

    if (allInvalidEmails.length > 0) {
        status.textContent = `${chrome.i18n.getMessage('invalidEmails')} ${allInvalidEmails.join(', ')}`;
        status.style.color = '#f44336';
        return;
    }

    // Format email lists
    const formatEmailList = (emailString) => {
        if (!emailString) return '';
        return emailString.split(',').map(email => email.trim()).join(', ');
    };

    // Save all settings
    const defaultBehavior = document.getElementById('defaultBehavior').value;
    chrome.storage.sync.set({
        defaultEmails: formatEmailList(defaultEmails),
        defaultCC: formatEmailList(defaultCC),
        defaultBCC: formatEmailList(defaultBCC),
        defaultSubject: defaultSubject,
        defaultBody: defaultBody,
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

    // Token insertion buttons for Subject
    document.getElementById('insertTitleSubject').addEventListener('click', function () {
        insertToken('defaultSubject', '{PAGE_TITLE}');
    });

    document.getElementById('insertUrlSubject').addEventListener('click', function () {
        insertToken('defaultSubject', '{PAGE_URL}');
    });

    // Token insertion buttons for Body
    document.getElementById('insertTitleBody').addEventListener('click', function () {
        insertToken('defaultBody', '{PAGE_TITLE}');
    });

    document.getElementById('insertUrlBody').addEventListener('click', function () {
        insertToken('defaultBody', '{PAGE_URL}');
    });
});

document.getElementById('save').addEventListener('click', saveSettings);
document.getElementById('closeButton').addEventListener('click', function () {
    window.close();
});
