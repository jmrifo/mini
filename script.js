// Main JavaScript functionality for the PDF portfolio site

class PDFPortfolio {
    constructor() {
        this.currentDocument = null;
        this.navMenu = document.getElementById('nav-menu');
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.pdfViewer = document.getElementById('pdf-viewer');
        this.pdfFrame = document.getElementById('pdf-frame');
        this.pdfTitle = document.getElementById('pdf-title');
        this.pdfDescription = document.getElementById('pdf-description');
        this.pdfDownload = document.getElementById('pdf-download');
        this.pdfView = document.getElementById('pdf-view');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.sidebar = document.querySelector('.sidebar');

        this.init();
    }

    init() {
        this.renderNavigation();
        this.bindEvents();
        this.checkUrlHash();
    }

    renderNavigation() {
        // Clear existing navigation
        this.navMenu.innerHTML = '';

        // Group documents by type
        const cvDocs = documents.filter(doc => doc.type === 'cv');
        const transcriptDocs = documents.filter(doc => doc.type === 'transcript');
        const paperDocs = documents.filter(doc => doc.type === 'paper');

        // Add CV section
        if (cvDocs.length > 0) {
            this.addSectionHeader('Curriculum Vitae');
            cvDocs.forEach(doc => this.addNavItem(doc));
        }

        // Add Transcripts section
        if (transcriptDocs.length > 0) {
            this.addSectionHeader('Transcripts');
            transcriptDocs.forEach(doc => this.addNavItem(doc));
        }

        // Add Papers section
        if (paperDocs.length > 0) {
            this.addSectionHeader('Research Papers');
            paperDocs.forEach(doc => this.addNavItem(doc));
        }
    }

    addSectionHeader(title) {
        const headerDiv = document.createElement('div');
        headerDiv.className = 'section-header';
        headerDiv.style.cssText = `
            padding: 1rem 1.5rem 0.5rem;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.7;
            border-top: 1px solid rgba(0,0,0,0.1);
            margin-top: 1rem;
            color: #222;
        `;
        if (title === 'Curriculum Vitae') {
            headerDiv.style.borderTop = 'none';
            headerDiv.style.marginTop = '0';
        }
        headerDiv.textContent = title;
        this.navMenu.appendChild(headerDiv);
    }

    addNavItem(doc) {
        const li = document.createElement('li');
        li.className = 'nav-item';

        const a = document.createElement('a');
        a.href = `#${doc.id}`;
        a.className = 'nav-link';
        a.dataset.docId = doc.id;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = doc.title;

        const descDiv = document.createElement('div');
        descDiv.className = 'description';
        descDiv.textContent = doc.description;

        a.appendChild(titleDiv);
        a.appendChild(descDiv);
        li.appendChild(a);
        this.navMenu.appendChild(li);
    }

    // ... rest unchanged ...
    // (the rest of the code remains as in your current file)
}
