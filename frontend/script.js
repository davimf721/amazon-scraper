// Adding an event listener to the 'scrapeButton' element for the 'click' event
document.getElementById('scrapeButton').addEventListener('click', () => {
    // Getting the value of the 'keyword' input field and removing leading/trailing whitespace
    const keyword = document.getElementById('keyword').value.trim();
    // Checking if the keyword is empty
    if (!keyword) {
        // Displaying an alert if the keyword is empty
        alert('Please, insert a keyword.');
        return; // Exiting the function if the keyword is empty
    }

    // Making a fetch request to the backend API endpoint '/api/scrape' with the keyword as a query parameter
    fetch(`/api/scrape?keyword=${keyword}`)
        // Parsing the response body as JSON
        .then(response => response.json())
        .then(data => {
            // Getting the 'results' element
            const results = document.getElementById('results');
            // Clearing any existing content inside the 'results' element
            results.innerHTML = '';
            // Checking if the response data is an array
            if (Array.isArray(data)) {
                // Iterating over each product in the response data
                data.forEach(product => {
                    // Creating a 'div' element for each product
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product'); // Adding the 'product' class to the 'div'

                    // Creating an 'img' element for the product image and setting its 'src' attribute
                    const productImage = document.createElement('img');
                    productImage.src = product.imageUrl;
                    // Appending the product image to the product 'div'
                    productDiv.appendChild(productImage);

                    // Creating a 'div' element for the product title and setting its text content
                    const productTitle = document.createElement('div');
                    productTitle.classList.add('product-title'); // Adding the 'product-title' class
                    productTitle.textContent = product.title;
                    // Appending the product title to the product 'div'
                    productDiv.appendChild(productTitle);

                    // Creating a 'div' element for the product rating and setting its text content
                    const productRating = document.createElement('div');
                    productRating.classList.add('product-rating'); // Adding the 'product-rating' class
                    productRating.textContent = `Rating: ${product.rating}`;
                    // Appending the product rating to the product 'div'
                    productDiv.appendChild(productRating);

                    // Creating a 'div' element for the product reviews and setting its text content
                    const productReviews = document.createElement('div');
                    productReviews.classList.add('product-reviews'); // Adding the 'product-reviews' class
                    productReviews.textContent = `Reviews: ${product.reviews}`;
                    // Appending the product reviews to the product 'div'
                    productDiv.appendChild(productReviews);

                    // Appending the product 'div' to the 'results' element
                    results.appendChild(productDiv);
                });
            } else {
                // If no products were found, displaying a message inside the 'results' element
                results.innerHTML = '<p>No products found.</p>';
            }
        })
        // Catching and logging any errors that occur during the fetch request
        .catch(error => {
            console.error('Error:', error);
        });
});