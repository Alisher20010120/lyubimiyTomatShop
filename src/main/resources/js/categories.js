document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.getElementById('categories-container');

    request.get('/getcategories')
        .then(response => {
            const categories = response.data;
            categoriesContainer.innerHTML = '';

            categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';

                // Asosan title va link
                categoryCard.innerHTML = `
                    <div class="category-content">
                        <h2 class="category-title">${category.name}</h2>
                        <p class="product-count" id="count-${category.id}">Yuklanmoqda...</p>
                        <a href="products.html?category=${encodeURIComponent(category.id)}" class="btn btn-primary">Mahsulotlarni ko'rish</a>
                    </div>
                `;

                categoriesContainer.appendChild(categoryCard);

                request.get(`/getProductCountByCategoryId/${category.id}`)
                    .then(res => {
                        const count = res.data.count;
                        const countElement = document.getElementById(`count-${category.id}`);
                        if (countElement) {
                            countElement.innerText = `${count} ta mahsulot mavjud`; // ← Shu yerda chiqariladi
                        }
                    })
                    .catch(err => {
                        const countElement = document.getElementById(`count-${category.id}`);
                        if (countElement) {
                            countElement.innerText = "Xatolik!";
                        }
                    });
            });
        })
        .catch(error => {
            categoriesContainer.innerHTML = '<p>Xatolik yuz berdi: ' + error.message + '</p>';
        });
});
