// Configuration file for documents
// Add new documents here and they will automatically appear in the sidebar

const documents = [
    // Example CV entry - replace with your actual CV
    {
        id: 'cv',
        title: 'Curriculum Vitae',
        description: 'My professional CV and experience',
        filename: 'cv.pdf',
        type: 'cv'
    }

    // Example paper entries - uncomment and modify as needed:
    /*
    {
        id: 'research-paper-1',
        title: 'Machine Learning Research',
        description: 'Advanced algorithms for data analysis',
        filename: 'research-paper-1.pdf',
        type: 'paper'
    },
    {
        id: 'thesis',
        title: 'Master\'s Thesis',
        description: 'Comprehensive study on artificial intelligence applications',
        filename: 'thesis.pdf',
        type: 'paper'
    },
    {
        id: 'conference-paper',
        title: 'Conference Presentation',
        description: 'Paper presented at International Tech Conference 2024',
        filename: 'conference-paper.pdf',
        type: 'paper'
    },
    {
        id: 'journal-article',
        title: 'Journal Article',
        description: 'Published research in Nature Computing',
        filename: 'nature-article-2024.pdf',
        type: 'paper'
    }
    */
];

// How to add new documents:
// 1. Add your PDF file to the 'pdfs/' directory
// 2. Add a new object to the 'documents' array above with:
//    - id: unique identifier (used in URLs, no spaces)
//    - title: display name in sidebar
//    - description: brief description shown in sidebar
//    - filename: exact PDF filename (must exist in pdfs/ directory)
//    - type: either 'cv' or 'paper'