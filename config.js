// Configuration file for documents
// Add new documents here and they will automatically appear in the sidebar

const documents = [
    {
        id: 'CV_JR-44.pdf',
        title: 'Curriculum Vitae (JR)',
        description: 'CV',
        filename: 'CV_JR-44.pdf',
        type: 'cv'
    },
    {
    id: 'eur',
    title: 'Master current Transcript',
    description: 'Current transcript from Master',
    filename: 'transcript_jr_eur.pdf',
    type: 'transcript'
},
    {
    id: 'ubt',
    title: 'Bachelor Transcript',
    description: 'Bachelor Transcript',
    filename: 'zeugnis_ubt.pdf',
    type: 'transcript'
},
    {
        id: 'Johannes_Renz_Thesis_p.pdf',
        title: 'Bachelor Thesis',
        description: 'Bachelor Thesis: Gender Differences in CEO Dismissals',
        filename: 'Johannes_Renz_Thesis_p.pdf',
        type: 'paper'
    },
    {
        id: 'Full_Paper_central_banks.pdf',
        title: 'Fed ESG',
        description: 'Paper on Federal Reserves Communication on Social and Climate issues.',
        filename: 'Full_Paper_central_banks.pdf',
        type: 'paper'
    },
    {
        id: 'Machine_Learning2_Renz.pdf',
        title: 'Machine Learning Paper 2',
        description: 'Clustering Countries for Development Assistance',
        filename: 'Machine_Learning2_ Renz.pdf',
        type: 'paper'
    },
    {
        id: 'NLP_Becker_Renz.pdf',
        title: 'NLP Project',
        description: 'Changes in Corporate Language',
        filename: 'NLP_Becker_Renz.pdf',
        type: 'paper'
    },
    {
        id: 'Paper_JR_narratives.pdf',
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
