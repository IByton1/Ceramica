const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;

// Serve static files from the browser directory
app.use(express.static('/home/Ceramica/warenwirtschaftssystem/dist/frontend-automaten/browser'));

// Redirect all requests to index.html
app.get('*', (req, res) => {
    res.sendFile('/home/Ceramica/warenwirtschaftssystem/dist/frontend-automaten/browser/index.html');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running and accessible on http://0.0.0.0:${port}`);
});
