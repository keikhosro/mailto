# mailto - Chrome Extension

A simple and elegant Chrome extension that allows you to quickly share web pages via email using your default email client.

## Features

- 🚀 **One-click sharing** - Click the extension icon to instantly open your email client with the page URL
- 📧 **Default recipients** - Set default email addresses for quick sharing
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
2. Your default email client will open with:
    - Page URL in the email body
    - Page title as the subject line

### Setting Default Recipients
1. Right-click the extension icon and select "Options"
2. Enter one or more email addresses (comma-separated)
3. Choose your preferred button behavior:
    - **Email without default recipient** - Opens blank email
    - **Email to default recipient** - Pre-fills your default recipients
4. Click "Save"

### Context Menu
Right-click anywhere on a page to access the email sharing options from the context menu.

## Configuration

### Default Email Addresses
You can configure default recipients in the extension options:
- Enter multiple addresses separated by commas
- Example: `john@example.com, jane@example.com`
- Leave blank to always send without default recipients

### Button Behavior
Choose what happens when you click the extension icon:
- The selected option becomes the primary action
- The other option remains available in the context menu

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
