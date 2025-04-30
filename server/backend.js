/*
 * Ceramica-Backend (Node.js + Express + MySQL2)
 * --------------------------------------------
 * DB-Struktur:  inventory_items (id, name, shelf, qty)
 * Autor:        <dein Name / dein Team>
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 4000;

/* ------------------------- Middleware ------------------------- */
app.use(cors());
app.use(express.json());

/* ---------------------- DB-Verbindung ------------------------ */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'ceramica_user',
    password: 'CeramicaP@ss123!',
    database: 'Ceramica',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const queryDB = (sql, params = []) =>
    new Promise((resolve, reject) =>
        pool.query(sql, params, (err, res) => (err ? reject(err) : resolve(res)))
    );

/* ==============================================================
   Endpoints
   ==============================================================*/

/* ---------- 1) Alle Inventar­einträge holen ------------------- */
app.get('/api/getItems', async (_req, res) => {
    try {
        const items = await queryDB('SELECT * FROM inventory_items ORDER BY name');
        res.json(items);
    } catch (e) {
        console.error('DB-Fehler beim Abrufen aller Items:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 2) Einzelnes Item nach ID holen ------------------- */
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [item] = await queryDB('SELECT * FROM inventory_items WHERE id = ?', [id]);

        if (!item) return res.status(404).json({ error: 'Item nicht gefunden' });
        res.json(item);
    } catch (e) {
        console.error('DB-Fehler beim Abrufen eines Items:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 3) Neues Item anlegen ----------------------------- */
app.post('/api/addItem', async (req, res) => {
    const { name, shelf, qty } = req.body;

    if (!name || !shelf || qty == null || qty < 0)
        return res.status(400).json({ error: 'name, shelf und qty ≥ 0 sind Pflichtfelder' });

    try {
        const result = await queryDB(
            'INSERT INTO inventory_items (name, shelf, qty) VALUES (?, ?, ?)',
            [name, shelf, qty]
        );
        res.status(201).json({ id: result.insertId, name, shelf, qty });
    } catch (e) {
        console.error('DB-Fehler beim Anlegen eines Items:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 4) Item komplett aktualisieren ------------------- */
app.put('/api/updateItem', async (req, res) => {
    const { id, name, shelf, qty } = req.body;

    if (!name || !shelf || qty == null || qty < 0)
        return res.status(400).json({ error: 'name, shelf und qty ≥ 0 sind Pflichtfelder' });

    try {
        const result = await queryDB(
            'UPDATE inventory_items SET name = ?, shelf = ?, qty = ? WHERE id = ?',
            [name, shelf, qty, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Item nicht gefunden' });

        res.json({ id: Number(id), name, shelf, qty });
    } catch (e) {
        console.error('DB-Fehler beim Aktualisieren eines Items:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 5) Nur Menge (qty) ändern ------------------------- */
app.patch('/api/items/:id/qty', async (req, res) => {
    const { id } = req.params;
    const { qty } = req.body;

    if (qty == null || qty < 0)
        return res.status(400).json({ error: 'qty ≥ 0 ist erforderlich' });

    try {
        const result = await queryDB(
            'UPDATE inventory_items SET qty = ? WHERE id = ?',
            [qty, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Item nicht gefunden' });

        res.json({ id: Number(id), qty });
    } catch (e) {
        console.error('DB-Fehler beim Aktualisieren von qty:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 6) Nur Regal (Shelf) ändern ---------------------------------- */
app.patch('/api/items/:id/shelf', async (req, res) => {
    const { id } = req.params;
    const { shelf } = req.body;

    if (!shelf)
        return res.status(400).json({ error: 'shelf ist erforderlich' });

    try {
        const result = await queryDB(
            'UPDATE inventory_items SET shelf = ? WHERE id = ?',
            [shelf, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Item nicht gefunden' });

        res.json({ id: Number(id), shelf });
    } catch (e) {
        console.error('DB-Fehler beim Aktualisieren von shelf:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------- 7) Nur Namen ändern ---------------------------------- */
app.patch('/api/items/:id/name', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name)
        return res.status(400).json({ error: 'name ist erforderlich' });

    try {
        const result = await queryDB(
            'UPDATE inventory_items SET name = ? WHERE id = ?',
            [name, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Item nicht gefunden' });

        res.json({ id: Number(id), name });
    } catch (e) {
        console.error('DB-Fehler beim Aktualisieren von name:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});


/* ---------- 7) Item löschen ---------------------------------- */
app.delete('/api/deleteItem/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await queryDB('DELETE FROM inventory_items WHERE id = ?', [id]);

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Item nicht gefunden' });

        res.json({ message: 'Item gelöscht', id: Number(id) });
    } catch (e) {
        console.error('DB-Fehler beim Löschen eines Items:', e);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

/* ---------------------- Server-Start -------------------------- */
app.listen(PORT, () =>
    console.log(`Ceramica-API läuft unter http://localhost:${PORT}`)
);
