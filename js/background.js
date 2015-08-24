function mailto(tab) {
    if (tab) {
        chrome.tabs.update(null, {
            url: 'mailto:?body=' + encodeURIComponent(tab.url) + '&subject=' + encodeURIComponent(tab.title)
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.browserAction.onClicked.addListener(function(tab) {
        mailto(tab);
    });

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        'title': chrome.i18n.getMessage('appName'),
        'contexts': ['all'],
        'onclick': function(info, tab) {
            mailto(tab);
        }
    });
});