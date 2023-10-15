function mailto(tab) {
    if (tab) {
        chrome.tabs.update(null, {
            url: 'mailto:?body=' + encodeURIComponent(tab.url) + '&subject=' + encodeURIComponent(tab.title)
        });
    }
}

chrome.action.onClicked.addListener(function(tab) {
    mailto(tab);
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        'id': 'mailto',
        'title': chrome.i18n.getMessage('appName'),
        'contexts': ['all']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'mailto') {
        mailto(tab);
    }
});