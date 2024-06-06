const express = require('express'); // Importing the Express.js framework
const path = require('path'); // Importing the path module for working with file and directory paths
const scraper = require('./scraper'); // Importing the scraper module for scraping Amazon

const app = express(); // Creating an Express application instance
const PORT = 3000; // Setting the port number for the server to listen on

// Serving static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint for scraping Amazon
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword; // Extracting the keyword from the query parameters
    // Checking if the keyword is provided
    if (!keyword) {
        // Sending a 400 Bad Request response if the keyword is missing
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        // Scraping Amazon for product listings based on the provided keyword
        const data = await scraper.scrapeAmazon(keyword);
        // Sending the scraped data as a JSON response
        res.json(data);
    } catch (error) {
        // Handling any errors that occur during scraping
        res.status(500).json({ error: error.message });
    }
});

// Serving the main HTML page
app.get('/', (req, res) => {
    // Sending the main HTML file as a response
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Logging a message when the server starts
});