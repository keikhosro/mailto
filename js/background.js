function isEmpty(value) {
    return !value || value.trim().length === 0;
}

function replaceTokens(text, tab) {
    if (!text) return '';
    return text
        .replace(/\{PAGE_TITLE\}/g, tab.title || '')
        .replace(/\{PAGE_URL\}/g, tab.url || '');
}

function mailto(tab, includeDefault) {
    if (tab) {
        // Get all settings from storage
        chrome.storage.sync.get(['defaultEmails', 'defaultCC', 'defaultBCC', 'defaultSubject', 'defaultBody'], function (result) {
            const defaultEmails = result.defaultEmails || '';
            const defaultCC = result.defaultCC || '';
            const defaultBCC = result.defaultBCC || '';
            const defaultSubject = result.defaultSubject || '';
            const defaultBody = result.defaultBody || '';

            // Replace tokens in subject and body
            const subject = replaceTokens(defaultSubject, tab) || tab.title;
            const body = replaceTokens(defaultBody, tab) || tab.url;

            // Build mailto URL
            let mailtoUrl = 'mailto:';

            // Add TO recipients if using defaults
            if (includeDefault && !isEmpty(defaultEmails)) {
                mailtoUrl += encodeURIComponent(defaultEmails);
            }

            // Build query parameters
            const params = [];

            if (includeDefault && !isEmpty(defaultCC)) {
                params.push(`cc=${encodeURIComponent(defaultCC)}`);
            }

            if (includeDefault && !isEmpty(defaultBCC)) {
                params.push(`bcc=${encodeURIComponent(defaultBCC)}`);
            }

            params.push(`subject=${encodeURIComponent(subject)}`);
            params.push(`body=${encodeURIComponent(body)}`);

            mailtoUrl += '?' + params.join('&');

            chrome.tabs.update(null, {url: mailtoUrl});
        });
    }
}

chrome.action.onClicked.addListener(function (tab) {
    chrome.storage.sync.get(['defaultBehavior'], function (result) {
        const useDefault = result.defaultBehavior === 'default';
        mailto(tab, useDefault);
    });
});

chrome.runtime.onInstalled.addListener(() => {
    updateContextMenus();
});

// Update context menus based on settings
function updateContextMenus() {
    chrome.storage.sync.get(['defaultEmails', 'defaultBehavior'], function (result) {
        const defaultEmails = result.defaultEmails || '';
        const hasDefaultEmails = !isEmpty(defaultEmails);

        chrome.contextMenus.removeAll(() => {
            // Base mailto without default recipient
            chrome.contextMenus.create({
                'id': 'mailto-blank',
                'title': chrome.i18n.getMessage('appName'),
                type: 'normal',
                'contexts': ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
            });

            // Check if default emails are configured
            if (hasDefaultEmails) {
                chrome.contextMenus.create({
                    'id': 'mailto-to-default',
                    'title': `${chrome.i18n.getMessage('appName')} ${chrome.i18n.getMessage('toDefaultRecipient')}`,
                    type: 'normal',
                    'contexts': ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
                });
            }
        });
    });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'mailto-blank') {
        mailto(tab, false);
    } else if (info.menuItemId === 'mailto-to-default') {
        mailto(tab, true);
    }
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateMenus') {
        updateContextMenus();
    }
});

// Listen for storage changes to update menus automatically
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && (changes.defaultEmails || changes.defaultBehavior)) {
        updateContextMenus();
    }
});
