# Mini - Academic Portfolio Website

A clean, responsive website for hosting PDFs of your written papers and CV with an elegant sidebar navigation.

![Portfolio Website](https://github.com/user-attachments/assets/d4ff204b-c671-4325-9bb0-95962d1cd7f3)

## Features

- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Sidebar Navigation**: Clean navigation with custom labels for each document
- **PDF Viewer**: Built-in PDF viewer with download and new tab options
- **Easy Configuration**: Simple JSON-like configuration for adding new documents
- **Document Types**: Separate sections for CV and research papers
- **Mobile-Friendly**: Hamburger menu and responsive layout for mobile devices

## Quick Start

1. **Add your PDF files** to the `pdfs/` directory
2. **Update the configuration** in `config.js` to list your documents
3. **Open `index.html`** in a web browser or deploy to any web server

## Adding New Documents

### Step 1: Add PDF Files
Place your PDF files in the `pdfs/` directory:
```
pdfs/
├── cv.pdf
├── research-paper-1.pdf
├── thesis.pdf
└── conference-paper.pdf
```

### Step 2: Update Configuration
Edit `config.js` and add entries to the `documents` array:

```javascript
const documents = [
    {
        id: 'cv',                              // Unique identifier (used in URLs)
        title: 'Curriculum Vitae',             // Title shown in sidebar
        description: 'My professional CV',      // Description text
        filename: 'cv.pdf',                   // Exact PDF filename
        type: 'cv'                           // Type: 'cv' or 'paper'
    },
    {
        id: 'machine-learning-paper',
        title: 'ML Research Paper',
        description: 'Advanced algorithms for data analysis',
        filename: 'research-paper-1.pdf',
        type: 'paper'
    }
];
```

### Document Types
- **`cv`**: Documents appear under "Curriculum Vitae" section
- **`paper`**: Documents appear under "Research Papers" section

## File Structure
```
mini/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── config.js           # Document configuration
├── pdfs/               # Directory for PDF files
│   └── README.md       # Instructions for PDF directory
└── README.md           # This file
```

## Deployment

### Local Development
```bash
# Using Python's built-in server
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Then open http://localhost:8000
```

### Web Deployment
Upload all files to any web server. The site works with:
- GitHub Pages
- Netlify
- Vercel
- Any standard web hosting service

## Mobile Support

![Mobile View](https://github.com/user-attachments/assets/f51ecc66-22b2-46d2-bff5-9537e5870f6f)

The website is fully responsive and includes:
- Hamburger menu for mobile devices
- Touch-friendly navigation
- Optimized PDF viewing on mobile
- Responsive typography and spacing

## Customization

### Styling
Edit `styles.css` to customize:
- Colors and gradients
- Fonts and typography
- Layout and spacing
- Mobile breakpoints

### Functionality
Edit `script.js` to customize:
- Navigation behavior
- PDF loading
- Mobile menu interactions
- URL routing

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## License

This project is open source and available under the MIT License.
