const express = require('express');
const scraper = require('./scraper');

const app = express();
const PORT = 3000;

// Endpoint para o scraping
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        const data = await scraper.scrapeAmazon(keyword);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});