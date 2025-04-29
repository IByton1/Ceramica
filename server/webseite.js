const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;

// Sauberer statischer Pfad + URL-Root definieren
const staticPath = '/home/Ceramica/warenwirtschaftssystem/dist/warenwirtschaftssystem/browser';
app.use('/', express.static(staticPath));

// Redirect alle anderen Anfragen auf index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Server starten
app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf http://0.0.0.0:${port}`);
});
