document.getElementById('go').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const out = document.getElementById('out');
    const iframe = document.getElementById('preview');
    out.textContent = '// Generating…';
    try {
        const res = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        const code = data.candidates?.[0]?.content?.parts?.[0]?.text || '// No code';
        out.textContent = code;
        iframe.srcdoc = code;
    } catch (e) {
        out.textContent = '// Error: ' + e.message;
    }
});