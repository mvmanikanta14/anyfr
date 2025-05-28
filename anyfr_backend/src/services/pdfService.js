const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PdfService {
    async generatePdf(content) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            doc.text(content);
            doc.end();
        });
    }

    async downloadPdf(filePath) {
        return fs.promises.readFile(filePath);
    }

    async proxyPdf(url) {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    }
}

module.exports = PdfService;