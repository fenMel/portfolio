const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configure le moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route principale
app.get('/', (req, res) => {
    const files = [
        { name: 'file1.pdf', url: '/files/file1.pdf' },
        { name: 'file2.docx', url: '/files/file2.docx' },
        { name: 'image.png', url: '/files/image.png' }
    ];
    res.render('index', { files });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
