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
        if (!this.navMenu) return;
        // Clear existing navigation
        this.navMenu.innerHTML = '';

        // Group documents by type
        if (typeof documents === "undefined") {
            console.error("The 'documents' array is not defined.");
            return;
        }
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

    bindEvents() {
        // Navigation click events
        if (this.navMenu) {
            this.navMenu.addEventListener('click', (e) => {
                const link = e.target.closest('.nav-link');
                if (link) {
                    e.preventDefault();
                    const docId = link.dataset.docId;
                    this.showDocument(docId);
                    this.closeMobileMenu();
                }
            });
        }

        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                this.sidebar && !this.sidebar.contains(e.target) && 
                this.mobileToggle && !this.mobileToggle.contains(e.target)) {
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
        if (hash && typeof documents !== "undefined" && documents.find(doc => doc.id === hash)) {
            this.showDocument(hash);
        } else {
            this.showWelcome();
        }
    }

    showDocument(docId) {
        if (typeof documents === "undefined") return;
        const doc = documents.find(d => d.id === docId);
        if (!doc) {
            console.error('Document not found:', docId);
            return;
        }

        this.currentDocument = doc;

        // Update URL hash only if needed
        if (window.location.hash.replace('#', '') !== docId) {
            window.location.hash = docId;
        }

        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-doc-id="${docId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update content
        if (this.pdfTitle) this.pdfTitle.textContent = doc.title;
        if (this.pdfDescription) this.pdfDescription.textContent = doc.description;
        
        const pdfPath = `pdfs/${doc.filename}`;
        if (this.pdfFrame) this.pdfFrame.src = pdfPath;
        if (this.pdfDownload) this.pdfDownload.href = pdfPath;
        if (this.pdfView) this.pdfView.href = pdfPath;

        // Show PDF viewer, hide welcome
        if (this.welcomeScreen) this.welcomeScreen.style.display = 'none';
        if (this.pdfViewer) this.pdfViewer.style.display = 'block';

        // Handle PDF loading errors
        if (this.pdfFrame) {
            // Remove previous listeners if any
            this.pdfFrame.onload = () => {
                // PDF loaded successfully
            };

            // Note: iframe.onerror is not reliable for PDF loading errors with PDFs,
            // so we use a timeout to check if the PDF failed to load.
            this.pdfFrame.onerror = null;
            setTimeout(() => {
                // If PDF didn't load, try to detect by checking contentWindow length
                // This is not bulletproof, but helps in some cases
                try {
                    const pdfLoaded = this.pdfFrame.contentDocument && this.pdfFrame.contentDocument.body.childNodes.length > 0;
                    if (!pdfLoaded) {
                        this.showPdfError(doc);
                    }
                } catch (e) {
                    // If cross-origin error, assume it loaded
                }
            }, 2000);
        }
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
        // Use an error container instead of srcdoc for better compatibility
        let errorContainer = document.getElementById('pdf-error-container');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'pdf-error-container';
            if (this.pdfViewer) this.pdfViewer.appendChild(errorContainer);
        }
        errorContainer.innerHTML = errorHtml;
        if (this.pdfFrame) this.pdfFrame.style.display = 'none';
        errorContainer.style.display = 'block';
    }

    showWelcome() {
        // Clear URL hash
        window.location.hash = '';

        // Clear active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show welcome, hide PDF viewer
        if (this.welcomeScreen) this.welcomeScreen.style.display = 'block';
        if (this.pdfViewer) this.pdfViewer.style.display = 'none';

        // Hide PDF error container and show iframe again
        const errorContainer = document.getElementById('pdf-error-container');
        if (errorContainer) errorContainer.style.display = 'none';
        if (this.pdfFrame) this.pdfFrame.style.display = 'block';

        this.currentDocument = null;
    }

    toggleMobileMenu() {
        if (this.sidebar) this.sidebar.classList.toggle('active');
    }

    closeMobileMenu() {
        if (this.sidebar) this.sidebar.classList.remove('active');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFPortfolio();

    // Handle PDF viewing fallback for browsers that don't support iframe PDF viewing
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
