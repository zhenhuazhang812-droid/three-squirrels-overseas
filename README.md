---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502202b4293305b54278e5984d09075a016e69c973bc15b1661554e9f29151edddc93022100c12b0a5eb275c6d91fb446b05d6ae18cc5c710a600e6bab7bb868ee41a2126b3
    ReservedCode2: 3044022066b5523a270bc8fa452de71a2cff21576afe7de03d7420eca956c71d1d8ce9310220324279622c0a2162abe31d46bd2afc881671944843e751ebc4c8ac419e4e535a
---

# Three Squirrels Overseas Center Website

A multilingual B2B website for showcasing Three Squirrels' premium Chinese snacks to global markets.

🌐 **Live Site**: https://7hdb5w984t5z.space.minimaxi.com

---

## Features

- 🌍 **5 Languages**: English, Chinese, Korean, Malay, Vietnamese
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Clean, professional B2B presentation
- ⚡ **Fast Loading**: Static site with CDN distribution
- 🔒 **Secure**: HTTPS enabled, no database vulnerabilities

---

## Quick Start

### 1. View the Site

Open `index.html` in your browser to preview locally.

### 2. Deploy to Netlify (Recommended)

**Option A: Drag & Drop**
1. Go to https://app.netlify.com/drop
2. Drag this folder to the drop zone
3. Done! 🎉

**Option B: GitHub Integration**
1. Upload this folder to a GitHub repository
2. Connect to Netlify
3. Automatic deployment on every push

See [docs/GITHUB-NETLIFY-SETUP-GUIDE.md](docs/GITHUB-NETLIFY-SETUP-GUIDE.md) for detailed setup.

---

## Project Structure

```
three-squirrels-overseas/
├── index.html              # Homepage
├── about.html              # About Us page
├── videos.html             # Video Center page
├── products.html           # Products listing
├── product-detail.html     # Product Detail page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── i18n.js            # Multilingual system
│   └── main.js            # Main JavaScript
├── i18n/                   # Translation files
│   ├── en.json            # English
│   ├── zh.json            # 中文 (Chinese)
│   ├── ko.json            # 한국어 (Korean)
│   ├── ms.json            # Bahasa Melayu (Malay)
│   └── vi.json            # Tiếng Việt (Vietnamese)
├── docs/
│   ├── GITHUB-NETLIFY-SETUP-GUIDE.md
│   └── QUICK-START.md
├── netlify.toml           # Netlify configuration
└── .gitignore             # Git ignore rules
```

---

## Updating Content

### Translation Files

To update text in any language, edit the corresponding JSON file:

| Language | File | Native Name |
|----------|------|-------------|
| English | `i18n/en.json` | English |
| Chinese | `i18n/zh.json` | 中文 |
| Korean | `i18n/ko.json` | 한국어 |
| Malay | `i18n/ms.json` | Bahasa Melayu |
| Vietnamese | `i18n/vi.json` | Tiếng Việt |

### Translation Keys

Each text element has a unique key, for example:

```json
{
  "hero": {
    "title": "Premium Chinese Snacks<br>For the World",
    "subtitle": "Bringing authentic Chinese snack culture..."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "products": "Products"
  }
}
```

---

## Adding New Content

### New Translation Key

1. Add the key to `i18n/en.json` (base language)
2. Add the same key to all other language files
3. In HTML, add `data-i18n="key.name"` to the element

Example:
```html
<!-- Add to HTML -->
<h2 data-i18n="newSection.title">Default Text</h2>

<!-- Add to i18n/en.json -->
{
  "newSection": {
    "title": "Your New Section Title"
  }
}
```

### For HTML Content (with line breaks)

Use `data-i18n-html` instead:
```html
<p data-i18n-html="true" data-i18n="footer.address">
  Building A, Innovation Park<br>Hefei, China
</p>
```

---

## Deployment

### Netlify (Recommended)

1. Create a GitHub repository
2. Push this code to the repository
3. Go to https://app.netlify.com
4. Click "Add new site" → Import from GitHub
5. Select your repository
6. Deploy!

### GitHub Pages

1. Push to GitHub
2. Go to repository Settings → Pages
3. Select source branch
4. Site will be available at `https://username.github.io/repo-name`

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## License

Proprietary - Three Squirrels Overseas Center

---

## Contact

For technical support, please contact the development team.
