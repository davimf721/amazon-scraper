const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function scrapeAmazon(keyword) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
    const products = [];

    productElements.forEach(productElement => {
        const title = productElement.querySelector('h2 a span')?.textContent || 'No title';
        const rating = productElement.querySelector('.a-icon-alt')?.textContent || 'No rating';
        const reviews = productElement.querySelector('.a-size-small .a-link-normal')?.textContent || 'No reviews';
        const imageUrl = productElement.querySelector('.s-image')?.src || 'No image';

        products.push({ title, rating, reviews, imageUrl });
    });

    return products;
}

module.exports = { scrapeAmazon };