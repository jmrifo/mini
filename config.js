// Configuration file for documents
// Add new documents here and they will automatically appear in the sidebar

const documents = [
    {
        id: 'cv_jr_44',
        title: 'Curriculum Vitae (JR)',
        description: 'CV',
        filename: 'CV_JR-44.pdf',
        type: 'cv'
    },
    {
        id: 'full_paper_central_banks',
        title: 'Fed ESG',
        description: 'Paper on Federal Reserve's Communication on Social and Climate issues.',
        filename: 'Full_Paper_central_banks.pdf',
        type: 'paper'
    },
    {
        id: 'johannes_renz_thesis',
        title: 'Bachelor Thesis',
        description: 'Bachelor Thesis: Gender Differences in CEO Dismissals',
        filename: 'Johannes_Renz_Thesis_p.pdf',
        type: 'paper'
    },
    {
        id: 'machine_learning2_renz',
        title: 'Machine Learning Paper 2',
        description: 'Clustering Countries for Development Assistance',
        filename: 'Machine_Learning2_ Renz.pdf',
        type: 'paper'
    },
    {
        id: 'nlp_becker_renz',
        title: 'NLP Project',
        description: 'Changes in Corporate Language',
        filename: 'NLP_Becker_Renz.pdf',
        type: 'paper'
    },
    {
        id: 'paper_jr_narratives',
        title: 'We-Narratives in Political Coalitions',
        description: 'We-Narratives in Political Coalitions',
        filename: 'Paper_JR_narratives.pdf',
        type: 'paper'
    }
];

// How to add new documents:
// 1. Add your PDF file to the 'pdfs/' directory
// 2. Add a new object to the 'documents' array above with:
//    - id: unique identifier (used in URLs, no spaces)
//    - title: display name in sidebar
//    - description: brief description shown in sidebar
//    - filename: exact PDF filename (must exist in pdfs/ directory)
//    - type: either 'cv' or 'paper'
