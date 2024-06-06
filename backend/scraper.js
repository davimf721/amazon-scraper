const axios = require('axios'); // Importing the axios library for making HTTP requests
const jsdom = require('jsdom'); // Importing the jsdom library for parsing HTML
const { JSDOM } = jsdom; // Destructuring JSDOM from the jsdom library

// Function to scrape Amazon for product listings based on a keyword
async function scrapeAmazon(keyword) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`; // Constructing the URL for Amazon search
    const { data } = await axios.get(url); // Making a GET request to the Amazon URL and extracting the response data
    const dom = new JSDOM(data); // Creating a JSDOM object from the HTML response
    const document = dom.window.document; // Accessing the document object of the JSDOM

    const productElements = document.querySelectorAll('.s-main-slot .s-result-item'); // Selecting product elements from the search results
    const products = []; // Initializing an array to store the extracted product information

    // Iterating through each product element to extract product details
    productElements.forEach(productElement => {
        // Extracting the product title, handling cases where the element may be missing
        const title = productElement.querySelector('h2 a span')?.textContent || 'No title';
        // Extracting the product rating, handling cases where the element may be missing
        const rating = productElement.querySelector('.a-icon-alt')?.textContent || 'No rating';
        // Extracting the number of reviews, handling cases where the element may be missing
        const reviews = productElement.querySelector('.a-size-small .a-link-normal')?.textContent || 'No reviews';
        // Extracting the product image URL, handling cases where the element may be missing
        const imageUrl = productElement.querySelector('.s-image')?.src || 'No image';

        // Constructing an object with the extracted product details and pushing it to the products array
        products.push({ title, rating, reviews, imageUrl });
    });

    return products; // Returning the array of extracted product information
}

module.exports = { scrapeAmazon }; // Exporting the scrapeAmazon function for external use