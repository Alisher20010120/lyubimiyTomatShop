document.addEventListener('DOMContentLoaded', function () {
    const productId = parseInt(getUrlParam('id'));
    if (!productId) {
        window.location.href = 'admin-products.html';
        return;
    }

    request.get(`/productsid/${productId}`)
        .then(function (response) {
            const product = response.data;

            const productDetailContainer = document.getElementById('product-detail');
            if (productDetailContainer) {
                productDetailContainer.innerHTML = `
                    <div class="product-detail-image">
                        <img src="http://localhost:8080/api/view/${product.attachment?.[0]?.id || ''}" />
                    </div>
                    <div class="product-detail-content">
                        <span class="category-badge">${product.category.name}</span>
                        <h1>${product.name}</h1>
                        <div class="price">${formatPrice(product.price)} so'm</div>
                        <div class="product-description-section">
                            <h2>Mahsulot haqida</h2>
                            <p>${product.description}</p>
                        </div>
                        <a href="https://t.me/your_bot_username?start=product_${product.id}" target="_blank" class="btn btn-primary btn-block">
                            Telegram orqali buyurtma berish
                        </a>
                    </div>
                `;
            }
        })
        .catch(function (error) {
            console.error(error);
            window.location.href = 'admin-products.html';
        });
});

function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

function formatPrice(price) {
    return price.toLocaleString('uz-UZ');
}
