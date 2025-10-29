# mailto - Chrome Extension

A simple and elegant Chrome extension that allows you to quickly share web pages via email using your default email client.

## Features

- 🚀 **One-click sharing** - Click the extension icon to instantly open your email client with the page URL
- 📧 **Default recipients** - Set default email addresses (TO, CC, BCC) for quick sharing
- 📝 **Customizable templates** - Create custom subject and body templates with tokens
- 🔄 **Dynamic tokens** - Use `{PAGE_TITLE}` and `{PAGE_URL}` tokens that auto-replace with current page info
- ⚙️ **Customizable behavior** - Choose whether the extension button uses default recipients or not
- 🌍 **Multi-language support** - Available in 21 languages
- 🎯 **Context menu integration** - Right-click anywhere to share via email
- ✨ **Clean interface** - Modern, intuitive settings page

## Installation

### From Chrome Web Store
[Install from Chrome Web Store](https://chromewebstore.google.com/detail/mailto/nhfdmebpfpogeakgjmgbalpnmggnnchj)

### Manual Installation (Development)
1. Clone this repository:
   ```bash
   git clone https://github.com/keikhosro/mailto.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory

## Usage

### Basic Usage
1. Click the extension icon in your browser toolbar
2. Your default email client will open with the configured settings

### Setting Up Email Templates

#### Configuring Recipients
1. Right-click the extension icon and select "Options"
2. Configure your recipients:
   - **TO** - Primary recipients (comma-separated)
   - **CC** - Carbon copy recipients (comma-separated)
   - **BCC** - Blind carbon copy recipients (comma-separated)

#### Using Tokens in Subject and Body
The extension supports two dynamic tokens that will be replaced with actual page information:

- **{PAGE_TITLE}** - Replaced with the current page's title
- **{PAGE_URL}** - Replaced with the current page's URL

**Example Subject Templates:**
```
Check out: {PAGE_TITLE}
Found this interesting: {PAGE_TITLE}
{PAGE_TITLE} - Thought you might like this
```

**Example Body Templates:**
```
I found this page and thought of you:

{PAGE_TITLE}
{PAGE_URL}

Let me know what you think!
```

```
Take a look at this article: {PAGE_TITLE}

Link: {PAGE_URL}
```

#### Inserting Tokens
When editing the Subject or Body fields in the options page:
1. Click the "Insert {PAGE_TITLE}" or "Insert {PAGE_URL}" buttons
2. The token will be inserted at your cursor position
3. You can manually type the tokens as well

#### Default Behavior
- If Subject is left blank, the page title will be used
- If Body is left blank, only the page URL will be used
- If no tokens are used, the text will be sent as-is

### Button Behavior Options

Choose what happens when you click the extension icon:
1. **Email without default recipient** - Opens blank email with templates but no TO address
2. **Email to default recipient** - Pre-fills all configured recipients and templates

The other option remains available in the right-click context menu.

### Context Menu
Right-click anywhere on a page to access the email sharing options from the context menu.

## Configuration Examples

### Example 1: Simple Sharing
```
TO: team@company.com
Subject: {PAGE_TITLE}
Body: {PAGE_URL}
```
Result: Quick sharing with just title and URL

### Example 2: Professional Sharing
```
TO: clients@company.com
CC: manager@company.com
Subject: Resource: {PAGE_TITLE}
Body: Hi,

I came across this resource that might be useful:

Title: {PAGE_TITLE}
Link: {PAGE_URL}

Best regards
```

### Example 3: Personal Sharing
```
TO: friends@example.com
Subject: Check this out!
Body: Hey! Found something cool:

{PAGE_TITLE}

Check it out here: {PAGE_URL}

Cheers!
```

## Supported Languages

The extension is available in 21 languages:
- English (en_US)
- Spanish (es)
- French (fr)
- German (de)
- Portuguese (pt)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Chinese Simplified (zh_CN)
- Chinese Traditional (zh_TW)
- Russian (ru)
- Arabic (ar)
- Farsi/Persian (fa)
- Dutch (nl)
- Hindi (hi)
- Turkish (tr)
- Polish (pl)
- Vietnamese (vi)
- Indonesian (id)
- Thai (th)
- Swedish (sv)

The extension automatically uses your browser's language setting.

## Development

### Building from Source
No build process required - this extension uses vanilla JavaScript.

### Token System
The token replacement system works as follows:
1. User configures subject/body with tokens in options
2. Settings are saved to Chrome's sync storage
3. When sharing, tokens are replaced with actual page data
4. Mailto URL is constructed with encoded parameters

## Privacy

This extension:
- ✅ Does NOT collect any user data
- ✅ Does NOT track browsing history
- ✅ Does NOT send data to external servers
- ✅ Stores settings locally using Chrome's storage API
- ✅ Only accesses the current page URL and title when you click the icon

All settings are stored locally on your device using Chrome's sync storage.

## Permissions

The extension requires the following permissions:
- **contextMenus** - To add right-click menu options
- **tabs** - To access the current page URL and title
- **storage** - To save your preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding a New Language
1. Create a new folder in `_locales/` with the language code (e.g., `_locales/fr/`)
2. Copy `_locales/en_US/messages.json` to the new folder
3. Translate all message values
4. Submit a pull request

### Reporting Issues
Please report bugs and feature requests on the [GitHub Issues page](https://github.com/keikhosro/mailto/issues).

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by [keikhosro](https://github.com/keikhosro)

## Links

- [Chrome Web Store](https://chromewebstore.google.com/detail/mailto/nhfdmebpfpogeakgjmgbalpnmggnnchj)
- [GitHub Repository](https://github.com/keikhosro/mailto)
- [Report Issues](https://github.com/keikhosro/mailto/issues)

---

**Tip:** If you find this extension useful, please consider starring ⭐ the repository!
