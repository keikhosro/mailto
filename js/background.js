function isEmpty(value) {
    return !value || value.trim().length === 0;
}

function mailto(tab, includeDefault) {
    if (tab) {
        // Get the default email addresses from storage
        chrome.storage.sync.get(['defaultEmails'], function (result) {
            const defaultEmails = result.defaultEmails || '';
            const mailtoUrl = `mailto:${includeDefault && !isEmpty(defaultEmails) ? encodeURIComponent(defaultEmails) : ''}?body=${encodeURIComponent(tab.url)}&subject=${encodeURIComponent(tab.title)}`;
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
    chrome.contextMenus.removeAll(() => {
        // Base mailto without default recipient
        chrome.contextMenus.create({
            'id': 'mailto-blank',
            'title': chrome.i18n.getMessage('appName'),
            type: 'normal',
            'contexts': ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
        });

        // Check if default emails are configured
        chrome.storage.sync.get(['defaultEmails'], function (result) {
            const defaultEmails = result.defaultEmails || '';
            if (!isEmpty(defaultEmails)) {
                chrome.contextMenus.create({
                    'id': 'mailto-to-default',
                    'title': `${chrome.i18n.getMessage('appName')} ${chrome.i18n.getMessage('toDefaultRecipient')}`,
                    type: 'normal',
                    'contexts': ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
                });
            }
        });
    });
});

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
