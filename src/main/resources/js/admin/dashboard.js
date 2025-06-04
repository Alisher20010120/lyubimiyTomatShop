// Admin dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mock data for recent orders
    const recentOrders = [
        {
            id: 1,
            customer: "Alisher Karimov",
            date: "2023-04-20T10:30:00",
            status: "new",
            total: 85000,
            products: [
                { id: 1, name: "Tomat pastasi", quantity: 2, price: 25000 },
                { id: 3, name: "Quritilgan tomat", quantity: 1, price: 30000 },
                { id: 4, name: "Tomat sharbati", quantity: 1, price: 12000 }
            ],
            telegramUsername: "@alisher_k",
            phone: "+998 90 123 45 67",
            address: "Toshkent sh., Chilonzor tumani, 19-kvartal, 10-uy"
        },
        {
            id: 2,
            customer: "Dilshod Rahimov",
            date: "2023-04-20T09:15:00",
            status: "processing",
            total: 56000,
            products: [
                { id: 2, name: "Tomat sousi", quantity: 2, price: 18000 },
                { id: 5, name: "Tomat ketchupi", quantity: 1, price: 20000 }
            ],
            telegramUsername: "@dilshod_r",
            phone: "+998 90 987 65 43",
            address: "Toshkent sh., Yunusobod tumani, 12-mavze, 5-uy"
        },
        {
            id: 3,
            customer: "Gulnora Azizova",
            date: "2023-04-19T16:45:00",
            status: "completed",
            total: 94000,
            products: [
                { id: 1, name: "Tomat pastasi", quantity: 1, price: 25000 },
                { id: 2, name: "Tomat sousi", quantity: 1, price: 18000 },
                { id: 6, name: "Tomat konservasi", quantity: 1, price: 22000 },
                { id: 7, name: "Achchiq tomat sousi", quantity: 1, price: 19000 },
                { id: 4, name: "Tomat sharbati", quantity: 1, price: 12000 }
            ],
            telegramUsername: "@gulnora_a",
            phone: "+998 90 555 44 33",
            address: "Toshkent sh., Mirzo Ulug'bek tumani, 6-mavze, 15-uy"
        }
    ];

    // Render recent orders
    const recentOrdersTable = document.getElementById('recent-orders-table');
    if (recentOrdersTable) {
        const tbody = recentOrdersTable.querySelector('tbody');
        tbody.innerHTML = '';

        recentOrders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${order.id}</td>
                <td>
                    <div>${order.customer}</div>
                    <div class="text-muted">${order.telegramUsername}</div>
                </td>
                <td>${formatDate(order.date)}</td>
                <td>${getStatusBadge(order.status)}</td>
                <td class="text-right">${formatPrice(order.total)} so'm</td>
                <td class="text-right">
                    <button class="btn btn-sm btn-outline view-order-btn" data-id="${order.id}">
                        <i class="fas fa-eye"></i> Ko'rish
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners to view order buttons
        const viewOrderButtons = document.querySelectorAll('.view-order-btn');
        viewOrderButtons.forEach(button => {
            button.addEventListener('click', function() {
                const orderId = parseInt(this.getAttribute('data-id'));
                showOrderDetails(orderId);
            });
        });
    }

    // Function to get status badge HTML
    function getStatusBadge(status) {
        switch (status) {
            case 'new':
                return '<span class="status-badge new">Yangi</span>';
            case 'processing':
                return '<span class="status-badge processing">Jarayonda</span>';
            case 'completed':
                return '<span class="status-badge completed">Yakunlangan</span>';
            case 'cancelled':
                return '<span class="status-badge cancelled">Bekor qilingan</span>';
            default:
                return `<span class="status-badge">${status}</span>`;
        }
    }

    // Function to show order details in modal
    function showOrderDetails(orderId) {
        const order = recentOrders.find(o => o.id === orderId);
        if (!order) return;

        const modal = document.getElementById('order-details-modal');
        const modalOrderId = document.getElementById('modal-order-id');
        const orderDetailsContent = document.getElementById('order-details-content');
        const modalClose = document.getElementById('modal-close');

        modalOrderId.textContent = order.id;

        // Generate order details HTML
        let productsHtml = '';
        let totalAmount = 0;

        order.products.forEach(product => {
            const productTotal = product.price * product.quantity;
            totalAmount += productTotal;
            productsHtml += `
                <tr>
                    <td>${product.name}</td>
                    <td class="text-center">${product.quantity}</td>
                    <td class="text-right">${formatPrice(product.price)} so'm</td>
                    <td class="text-right">${formatPrice(productTotal)} so'm</td>
                </tr>
            `;
        });

        orderDetailsContent.innerHTML = `
            <div class="order-status">
                <label>Status:</label>
                <select id="order-status-select" class="status-select">
                    <option value="new" ${order.status === 'new' ? 'selected' : ''}>Yangi</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Jarayonda</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Yakunlangan</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Bekor qilingan</option>
                </select>
            </div>

            <div class="customer-info">
                <h3>Mijoz ma'lumotlari</h3>
                <div class="customer-info-grid">
                    <div class="customer-info-item">
                        <span>Ism:</span> ${order.customer}
                    </div>
                    <div class="customer-info-item">
                        <span>Telegram:</span> ${order.telegramUsername}
                    </div>
                    <div class="customer-info-item">
                        <span>Telefon:</span> ${order.phone}
                    </div>
                    <div class="customer-info-item">
                        <span>Manzil:</span> ${order.address}
                    </div>
                </div>
            </div>

            <h3>Buyurtma qilingan mahsulotlar</h3>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Mahsulot</th>
                            <th class="text-center">Miqdori</th>
                            <th class="text-right">Narxi</th>
                            <th class="text-right">Jami</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHtml}
                        <tr>
                            <td colspan="3" class="text-right"><strong>Jami:</strong></td>
                            <td class="text-right"><strong>${formatPrice(order.total)} so'm</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-actions">
                <button class="btn btn-outline" id="close-modal-btn">Yopish</button>
                <button class="btn btn-primary">Chop etish</button>
            </div>
        `;

        // Show modal
        modal.classList.add('open');

        // Close modal when clicking the close button
        modalClose.addEventListener('click', function() {
            modal.classList.remove('open');
        });

        // Close modal when clicking the close button in the footer
        const closeModalBtn = document.getElementById('close-modal-btn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.classList.remove('open');
            });
        }

        // Handle status change
        const statusSelect = document.getElementById('order-status-select');
        if (statusSelect) {
            statusSelect.addEventListener('change', function() {
                const newStatus = this.value;
                // In a real app, you would update the status via API
                console.log(`Updating order ${order.id} status to ${newStatus}`);
                // For demo purposes, we'll just update the UI
                order.status = newStatus;
            });
        }
    }
});