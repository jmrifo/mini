# PDF Files Directory

This directory contains all the PDF files for your academic portfolio.

## How to add new PDFs:

1. **Add your PDF file** to this directory (`pdfs/`)
2. **Update the configuration** in the `config.js` file in the root directory
3. **Add a new document object** to the `documents` array with:
   - `id`: A unique identifier (used in URLs)
   - `title`: The title shown in the sidebar
   - `description`: Brief description shown in sidebar
   - `filename`: The exact filename of your PDF (must match the file in this directory)
   - `type`: Either 'cv' or 'paper'

## Example configuration:

```javascript
{
    id: 'my-new-paper',
    title: 'My Research Paper',
    description: 'Description of what this paper is about',
    filename: 'my-research-paper.pdf',
    type: 'paper'
}
```

## Current placeholder files:

The following files are referenced in the default configuration but are placeholder files:

- `cv.pdf` - Replace with your actual CV
- `research-paper-1.pdf` - Replace with your actual research paper
- `thesis.pdf` - Replace with your actual thesis
- `conference-paper.pdf` - Replace with your actual conference paper

You can delete any of these placeholder entries from `config.js` if you don't have those specific documents.