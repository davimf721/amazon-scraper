document.getElementById('scrapeButton').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value.trim();
    if (!keyword) {
        alert('Por favor, insira uma palavra-chave.');
        return;
    }

    fetch(`/api/scrape?keyword=${keyword}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    
                    const productImage = document.createElement('img');
                    productImage.src = product.imageUrl;
                    productDiv.appendChild(productImage);

                    const productTitle = document.createElement('div');
                    productTitle.classList.add('product-title');
                    productTitle.textContent = product.title;
                    productDiv.appendChild(productTitle);

                    const productRating = document.createElement('div');
                    productRating.classList.add('product-rating');
                    productRating.textContent = `Rating: ${product.rating}`;
                    productDiv.appendChild(productRating);

                    const productReviews = document.createElement('div');
                    productReviews.classList.add('product-reviews');
                    productReviews.textContent = `Reviews: ${product.reviews}`;
                    productDiv.appendChild(productReviews);

                    results.appendChild(productDiv);
                });
            } else {
                results.innerHTML = '<p>Nenhum produto encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});