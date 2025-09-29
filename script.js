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
        const paperDocs = documents.filter(doc => doc.type === 'paper');

        // Add CV section
        if (cvDocs.length > 0) {
            this.addSectionHeader('Curriculum Vitae');
            cvDocs.forEach(doc => this.addNavItem(doc));
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
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 1rem;
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

    bindEvents() {
        // Navigation click events
        this.navMenu.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.nav-link');
            if (link) {
                const docId = link.dataset.docId;
                this.showDocument(docId);
                this.closeMobileMenu();
            }
        });

        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !this.sidebar.contains(e.target) && 
                !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle browser back/forward
        window.addEventListener('hashchange', () => {
            this.checkUrlHash();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    checkUrlHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && documents.find(doc => doc.id === hash)) {
            this.showDocument(hash);
        } else {
            this.showWelcome();
        }
    }

    showDocument(docId) {
        const doc = documents.find(d => d.id === docId);
        if (!doc) {
            console.error('Document not found:', docId);
            return;
        }

        this.currentDocument = doc;

        // Update URL
        window.history.pushState(null, null, `#${docId}`);

        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-doc-id="${docId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update content
        this.pdfTitle.textContent = doc.title;
        this.pdfDescription.textContent = doc.description;
        
        const pdfPath = `pdfs/${doc.filename}`;
        this.pdfFrame.src = pdfPath;
        this.pdfDownload.href = pdfPath;
        this.pdfView.href = pdfPath;

        // Show PDF viewer, hide welcome
        this.welcomeScreen.style.display = 'none';
        this.pdfViewer.style.display = 'block';

        // Handle PDF loading errors
        this.pdfFrame.onload = () => {
            // PDF loaded successfully
        };

        this.pdfFrame.onerror = () => {
            this.showPdfError(doc);
        };
    }

    showPdfError(doc) {
        const errorHtml = `
            <div style="padding: 2rem; text-align: center; color: #666;">
                <h3>PDF Not Found</h3>
                <p>The file <code>pdfs/${doc.filename}</code> could not be loaded.</p>
                <p>Please make sure the PDF file exists in the pdfs/ directory.</p>
                <div style="margin-top: 1rem;">
                    <a href="pdfs/${doc.filename}" target="_blank" class="btn btn-primary">Try Direct Link</a>
                </div>
            </div>
        `;
        this.pdfFrame.srcdoc = errorHtml;
    }

    showWelcome() {
        // Clear URL hash
        window.history.pushState(null, null, window.location.pathname);

        // Clear active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show welcome, hide PDF viewer
        this.welcomeScreen.style.display = 'block';
        this.pdfViewer.style.display = 'none';

        this.currentDocument = null;
    }

    toggleMobileMenu() {
        this.sidebar.classList.toggle('active');
    }

    closeMobileMenu() {
        this.sidebar.classList.remove('active');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFPortfolio();
});

// Handle PDF viewing fallback for browsers that don't support iframe PDF viewing
document.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports PDF viewing in iframes
    const testPdfSupport = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        
        if (isMobile) {
            // On mobile, always show download/view links prominently
            const pdfActions = document.querySelector('.pdf-actions');
            if (pdfActions) {
                pdfActions.style.marginBottom = '1rem';
            }
        }
    };

    testPdfSupport();
});