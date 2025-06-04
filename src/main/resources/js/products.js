document.addEventListener('DOMContentLoaded', function() {

    const productsContainer = document.getElementById('products-container');
    const categoryFiltersContainer = document.getElementById('category-filters');
     let products=[]
    // API orqali mahsulotlarni olish
    request.get('/getproducts')
        .then(response => {
              products = response.data;
            console.log(response);
            if (productsContainer) {
                renderCategoryFilters(products);
            }

            const featuredProductsContainer = document.getElementById('featured-products');
            if (featuredProductsContainer) {
                renderFeaturedProducts(products.slice(0, 4));
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
            if (productsContainer)
                productsContainer.innerHTML = '<p>Xatolik yuz berdi: ' + error.message + '</p>';
        });

    function renderProducts(productsToRender) {
        productsContainer.innerHTML = '';
        if (productsToRender.length === 0) {
            productsContainer.innerHTML = '<div class="no-results">Mahsulotlar topilmadi</div>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="http://localhost:8080/api/view/${product.attachment?.[0]?.id || ''}" width="50"/>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)} so'm</div>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline">Batafsil</a>
                        <a href="https://t.me/your_bot_username?start=product_${product.id}" target="_blank" class="btn btn-primary">Buyurtma berish</a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    function renderCategoryFilters(products) {
        if (!categoryFiltersContainer) return;

        const categories = [...new Set(products.map(p => JSON.stringify(p.category)))].map(c => JSON.parse(c));
        categoryFiltersContainer.innerHTML = '';

        // "Hammasi" tugmasi
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.textContent = 'Hammasi';
        allButton.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            allButton.classList.add('active');
            renderProducts(products);
        });
        categoryFiltersContainer.appendChild(allButton);

        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.setAttribute('data-category', category.id);
            button.textContent = category.name;
            categoryFiltersContainer.appendChild(button);
        });

        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            const categoryIdAttr = button.getAttribute('data-category');
            if (!categoryIdAttr) return; // "Hammasi" tugmasiga event bermaymiz

            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const categoryId = parseInt(categoryIdAttr);
                const filtered = products.filter(p => p.category?.id === categoryId);
                renderProducts(filtered);
            });
        });


        // URLdan kategoriya tanlangan bo‘lsa
        const categoryParam = getUrlParam('category');
        if (categoryParam) {
            const categoryButton = document.querySelector(`.filter-btn[data-category="${categoryParam}"]`);
            if (categoryButton) categoryButton.click();
            else renderProducts(products);
        } else {
            renderProducts(products);
        }
    }


    function renderFeaturedProducts(products) {
        const featuredProductsContainer = document.getElementById('featured-products');
        if (!featuredProductsContainer) return;

        featuredProductsContainer.innerHTML = '';

        products.forEach(product => {
            console.log(product.attachment)
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="http://localhost:8080/api/view/${product.attachment?.[0]?.id || ''}" width="50"/>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)} so'm</div>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline">Batafsil</a>
                        <a href="https://t.me/your_bot_username?start=product_${product.id}" target="_blank" class="btn btn-primary">Buyurtma berish</a>
                    </div>
                </div>
            `;
            featuredProductsContainer.appendChild(productCard);
        });
    }

    function formatPrice(price) {
        return price.toLocaleString('uz-UZ');
    }

    function getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

});
