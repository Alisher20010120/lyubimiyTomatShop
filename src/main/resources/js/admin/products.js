// Admin products page JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const productModal = document.getElementById("product-modal");
    const productBtn = document.getElementById("add-product-button");
    const productClose = document.getElementById("product-modal-close");
    const productCancel = document.getElementById("product-cancel");

    // Modalni ko'rsatish
    productBtn.addEventListener("click", () => {
        document.getElementById("product-form").reset();
        document.getElementById("product-id").value = "";
        document.getElementById("product-modal-title").innerText = "Yangi mahsulot qo'shish";
        productModal.classList.add("open");
    });

    // Modalni yopish
    const closeProductModal = () => {
        productModal.classList.remove("open");
    };
    productClose.addEventListener("click", closeProductModal);
    productCancel.addEventListener("click", closeProductModal);

    // Tashqariga bosilsa yopish
    window.addEventListener("click", (event) => {
        if (event.target === productModal) {
            closeProductModal();
        }
    });

    // Yuklashlar
    loadCategories();
    loadProducts('all');
});

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-long-description").value;
    const price = document.getElementById("product-price").value;
    const categoryId = document.getElementById("product-category").value;
    const image = document.getElementById("product-image").files[0];

    if (!name || !description || !price || !categoryId || !image) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    request.post("/addProducts", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
        alert("Mahsulot qo'shildi");
        document.getElementById("product-form").reset();
        document.getElementById("product-modal").classList.remove("open");
        loadProducts(); // Yangilash
    }).catch(err => {
        alert("Xatolik: " + err.message);
    });
}

function loadCategories() {
    request.get("/categories").then(res => {
        populateCategoryFilters(res.data);
    }).catch(err => {
        console.error("Kategoriya yuklanmadi:", err);
    });
}

function populateCategoryFilters(categories) {
    const categoryFilter = document.getElementById('category-filter');
    const productCategorySelect = document.getElementById('product-category');

    // categoryFilter uchun kategoriyalarni to'ldirish
    if (categoryFilter) {
        categoryFilter.innerHTML = "";
        const defaultOption = new Option("Barcha kategoriyalar", "all", true, true);
        categoryFilter.appendChild(defaultOption);
        categories.forEach(cat => {
            const option = new Option(cat.name, cat.id);
            categoryFilter.appendChild(option);
        });

        categoryFilter.addEventListener('change', function () {
            loadProducts(this.value);  // Kategoriyani filtrlash
        });
    }

    // productCategorySelect uchun kategoriyalarni to'ldirish
    if (productCategorySelect) {
        productCategorySelect.innerHTML = "";
        const defaultOption = new Option("Kategoriya tanlang", "", true, true);
        defaultOption.disabled = true;
        productCategorySelect.appendChild(defaultOption);
        categories.forEach(cat => {
            const option = new Option(cat.name, cat.id);
            productCategorySelect.appendChild(option);
        });
    }
}

function loadProducts(categoryId = 'all') {
    let url = '/product';
    if (categoryId !== 'all') {
        url += `?categoryId=${categoryId}`;
    }

    request.get(url).then(res => {
        displayProducts(res.data);
    }).catch(err => {
        console.error("Mahsulotlar yuklanmadi:", err);
        const tbody = document.querySelector('#products-table tbody');
        tbody.innerHTML = '<tr><td colspan="6">Xatolik yuz berdi</td></tr>';
    });
}

function displayProducts(products) {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    if (!products || products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Mahsulot topilmadi</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.setAttribute('data-product-id', product.id);
        row.innerHTML = `
            <td><img src="http://localhost:8080/api/view/${product.attachment?.[0]?.id || ''}" width="50"/></td>
            <td>${product.name}</td>
            <td>${product.category?.name || 'Noma’lum'}</td>
            <td>${product.price} so'm</td>
            <td>
                <button class="edit-btn">Tahrirlash</button>
                <button class="delete-btn">O'chirish</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    attachDeleteEvents(); // MUHIM!
    attachEditEvents()
}

let deleteProductId = null;

function openDeleteModal(productId, productName) {
    deleteProductId = productId;
    document.getElementById('delete-product-name').textContent = productName;
    document.getElementById('delete-modal').style.display = 'block';
}

function closeDeleteModal() {
    deleteProductId = null;
    document.getElementById('delete-modal').style.display = 'none';
}

function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            const productId = row.dataset.productId;
            const productName = row.children[1].textContent;
            openDeleteModal(productId, productName);
        });
    });
}

// Modal tugmalari
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('delete-modal-close').addEventListener('click', closeDeleteModal);
    document.getElementById('delete-cancel').addEventListener('click', closeDeleteModal);

    document.getElementById('delete-confirm').addEventListener('click', function () {
        if (deleteProductId) {
            request.delete(`/deleteproduct/${deleteProductId}`)
                .then(() => {
                    closeDeleteModal();
                    // O'chirishdan keyin, qidiruv filtridan kelgan so'rovni tekshirib ko'ring
                    const search = document.getElementById("product-search").value.trim();
                    const categoryFilter = document.getElementById('category-filter').value;
                    if (search) {
                        loadProductsBySearch(search); // Qidiruvga ko'ra yuklash
                    } else if (categoryFilter !== 'all') {
                        loadProducts(categoryFilter); // Kategoriyaga ko'ra yuklash
                    } else {
                        loadProducts(); // Barcha mahsulotlarni qaytarish
                    }
                })
                .catch(err => {
                    console.error("O'chirishda xatolik:", err);
                });
        }
    });
});

document.getElementById("product-search").addEventListener("input", function () {
    const search = this.value.trim();
    let url = "/searchproduct"; // asosiy URL

    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    request.get(url).then(res => {
        displayProducts(res.data);
    }).catch(err => {
        console.error("Qidiruvda xatolik:", err);
    });
});

document.getElementById("product-search").addEventListener("input", function () {
    const search = this.value.trim();

    // Agar qidiruv bo'sh bo'lsa, barcha mahsulotlarni yuklash
    if (search === "") {
        loadProducts();  // Barcha mahsulotlarni yuklash
    } else {
        const url = `/searchproduct?search=${encodeURIComponent(search)}`;
        request.get(url).then(res => {
            displayProducts(res.data);
        }).catch(err => {
            console.error("Qidiruvda xatolik:", err);
        });
    }
});


// Edit
function attachEditEvents() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            const productId = row.dataset.productId;
            loadProductForEdit(productId);  // Mahsulotni tahrirlash uchun yuklash
        });
    });
}

function loadProductForEdit(productId) {
    request.get(`/editproduct/${productId}`).then(res => {
        const product = res.data;

        // Kategoriyalar yuklangandan keyin mahsulot ma'lumotlarini qo'yamiz
        request.get("/categories").then(catRes => {
            const categorySelect = document.getElementById("edit-product-category");
            categorySelect.innerHTML = "";

            const defaultOption = new Option("Kategoriya tanlang", "", true, true);
            defaultOption.disabled = true;
            categorySelect.appendChild(defaultOption);

            catRes.data.forEach(cat => {
                const option = new Option(cat.name, cat.id);
                categorySelect.appendChild(option);
            });

            // Kategoriya yuklangandan keyin mahsulotni inputlarga joylash
            document.getElementById("edit-product-id").value = product.id;
            document.getElementById("edit-product-name").value = product.name;
            document.getElementById("edit-product-description").value = product.description;
            document.getElementById("edit-product-price").value = product.price;

            if (product.category) {
                categorySelect.value = product.category.id;
            } else {
                categorySelect.value = "";
            }

            document.getElementById("edit-product-modal").classList.add("open");

        }).catch(err => {
            console.error("Kategoriya yuklashda xatolik:", err);
        });

    }).catch(err => {
        console.error("Mahsulotni olishda xatolik:", err);
    });
}



function closeEditModal() {
    document.getElementById("edit-product-modal").classList.remove("open");
}

// Tahrirlash modalini yopish
document.getElementById("edit-product-cancel").addEventListener("click", closeEditModal);

// Tahrirlash formani yuborish
document.getElementById("edit-product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const productId = document.getElementById("edit-product-id").value;
    const name = document.getElementById("edit-product-name").value;
    const description = document.getElementById("edit-product-description").value;
    const price = document.getElementById("edit-product-price").value;
    const categoryId = document.getElementById("edit-product-category").value;
    const image = document.getElementById("edit-product-image").files[0];

    if (!name || !description || !price || !categoryId) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    request.put(`/updateproduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
        alert("Mahsulot yangilandi");
        closeEditModal();
        loadProducts(); // Ma'lumotlarni qaytadan yuklash
    }).catch(err => {
        console.error("Tahrirlashda xatolik:", err);
        alert("Xatolik: " + err.message);
    });
});

// Modal tashqarisiga bosilsa yopish
window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("edit-product-modal")) {
        closeEditModal();
    }
});
