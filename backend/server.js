const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = 'AIzaSyC-w2vgr9JGu3eqQ-kYJB_BgRS1eE6_Eu4';

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const resp = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Write full HTML, CSS, and JavaScript code for this: " + prompt }] }]
                })
            }
        );
        const data = await resp.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
