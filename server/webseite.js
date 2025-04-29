const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;

const staticPath = path.join(__dirname, '../warenwirtschaftssystem/dist/warenwirtschaftssystem/browser');

app.use(express.static(staticPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf http://0.0.0.0:${port}`);
});
