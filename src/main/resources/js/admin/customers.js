// Admin customers page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mock data for customers
    const customers = [
        {
            id: 1,
            name: "Alisher Karimov",
            telegramUsername: "@alisher_k",
            phone: "+998 90 123 45 67",
            address: "Toshkent sh., Chilonzor tumani, 19-kvartal, 10-uy",
            orderCount: 5,
            totalSpent: 245000,
            lastOrderDate: "2023-04-20T10:30:00",
            orders: [
                { id: 1, date: "2023-04-20T10:30:00", total: 85000, status: "new" },
                { id: 8, date: "2023-03-15T14:20:00", total: 43000, status: "completed" },
                { id: 12, date: "2023-02-28T09:45:00", total: 37000, status: "completed" },
                { id: 15, date: "2023-01-10T16:30:00", total: 50000, status: "completed" },
                { id: 18, date: "2022-12-05T11:15:00", total: 30000, status: "completed" }
            ]
        },
        {
            id: 2,
            name: "Dilshod Rahimov",
            telegramUsername: "@dilshod_r",
            phone: "+998 90 987 65 43",
            address: "Toshkent sh., Yunusobod tumani, 12-mavze, 5-uy",
            orderCount: 3,
            totalSpent: 156000,
            lastOrderDate: "2023-04-20T09:15:00",
            orders: [
                { id: 2, date: "2023-04-20T09:15:00", total: 56000, status: "processing" },
                { id: 9, date: "2023-03-10T13:40:00", total: 60000, status: "completed" },
                { id: 16, date: "2023-01-05T10:20:00", total: 40000, status: "completed" }
            ]
        },
        {
            id: 3,
            name: "Gulnora Azizova",
            telegramUsername: "@gulnora_a",
            phone: "+998 90 555 44 33",
            address: "Toshkent sh., Mirzo Ulug'bek tumani, 6-mavze, 15-uy",
            orderCount: 7,
            totalSpent: 380000,
            lastOrderDate: "2023-04-19T16:45:00",
            orders: [
                { id: 3, date: "2023-04-19T16:45:00", total: 94000, status: "completed" },
                { id: 7, date: "2023-03-25T11:30:00", total: 45000, status: "completed" },
                { id: 10, date: "2023-03-05T15:20:00", total: 62000, status: "completed" },
                { id: 13, date: "2023-02-18T12:10:00", total: 38000, status: "completed" },
                { id: 17, date: "2022-12-20T14:45:00", total: 55000, status: "completed" },
                { id: 19, date: "2022-11-15T09:30:00", total: 42000, status: "completed" },
                { id: 21, date: "2022-10-10T16:15:00", total: 44000, status: "completed" }
            ]
        },
        {
            id: 4,
            name: "Sardor Umarov",
            telegramUsername: "@sardor_u",
            phone: "+998 90 111 22 33",
            address: "Toshkent sh., Shayxontohur tumani, 5-mavze, 7-uy",
            orderCount: 2,
            totalSpent: 73000,
            lastOrderDate: "2023-04-19T14:20:00",
            orders: [
                { id: 4, date: "2023-04-19T14:20:00", total: 43000, status: "completed" },
                { id: 11, date: "2023-03-01T10:15:00", total: 30000, status: "completed" }
            ]
        },
        {
            id: 5,
            name: "Nodira Karimova",
            telegramUsername: "@nodira_k",
            phone: "+998 90 777 88 99",
            address: "Toshkent sh., Olmazor tumani, 3-mavze, 12-uy",
            orderCount: 4,
            totalSpent: 190000,
            lastOrderDate: "2023-04-18T11:10:00",
            orders: [
                { id: 5, date: "2023-04-18T11:10:00", total: 60000, status: "cancelled" },
                { id: 14, date: "2023-02-10T13:25:00", total: 45000, status: "completed" },
                { id: 20, date: "2022-11-05T11:40:00", total: 35000, status: "completed" },
                { id: 22, date: "2022-09-20T15:30:00", total: 50000, status: "completed" }
            ]
        }
    ];

    // Render customers
    function renderCustomers(customersToRender) {
        const customersTable = document.getElementById('customers-table');
        if (!customersTable) return;

        const tbody = customersTable.querySelector('tbody');
        tbody.innerHTML = '';

        if (customersToRender.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Mijozlar topilmadi</td></tr>';
            return;
        }

        customersToRender.forEach(customer => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.telegramUsername}</td>
                <td>${customer.phone}</td>
                <td class="text-center">${customer.orderCount}</td>
                <td class="text-right">${formatPrice(customer.totalSpent)} so'm</td>
                <td class="text-right">
                    <button class="btn btn-sm btn-outline view-customer-btn" data-id="${customer.id}">
                        <i class="fas fa-eye"></i> Ko'rish
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners to view customer buttons
        const viewCustomerButtons = document.querySelectorAll('.view-customer-btn');
        viewCustomerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const customerId = parseInt(this.getAttribute('data-id'));
                showCustomerDetails(customerId);
            });
        });
    }

    // Function to show customer details in modal
    function showCustomerDetails(customerId) {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;

        const modal = document.getElementById('customer-details-modal');
        const customerDetailsContent = document.getElementById('customer-details-content');
        const modalClose = document.getElementById('modal-close');

        // Generate customer orders HTML
        let ordersHtml = '';
        customer.orders.forEach(order => {
            ordersHtml += `
                <tr>
                    <td>#${order.id}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${getStatusBadge(order.status)}</td>
                    <td class="text-right">${formatPrice(order.total)} so'm</td>
                    <td class="text-right">
                        <a href="orders.html?id=${order.id}" class="btn btn-sm btn-outline">
                            <i class="fas fa-eye"></i> Ko'rish
                        </a>
                    </td>
                </tr>
            `;
        });

        customerDetailsContent.innerHTML = `
            <div class="customer-info">
                <h3>Mijoz ma'lumotlari</h3>
                <div class="customer-info-grid">
                    <div class="customer-info-item">
                        <span>Ism:</span> ${customer.name}
                    </div>
                    <div class="customer-info-item">
                        <span>Telegram:</span> ${customer.telegramUsername}
                    </div>
                    <div class="customer-info-item">
                        <span>Telefon:</span> ${customer.phone}
                    </div>
                    <div class="customer-info-item">
                        <span>Manzil:</span> ${customer.address}
                    </div>
                    <div class="customer-info-item">
                        <span>Buyurtmalar soni:</span> ${customer.orderCount}
                    </div>
                    <div class="customer-info-item">
                        <span>Jami xarid:</span> ${formatPrice(customer.totalSpent)} so'm
                    </div>
                    <div class="customer-info-item">
                        <span>So'nggi buyurtma:</span> ${formatDate(customer.lastOrderDate)}
                    </div>
                </div>
            </div>

            <h3>Mijoz buyurtmalari</h3>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sana</th>
                            <th>Status</th>
                            <th class="text-right">Summa</th>
                            <th class="text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ordersHtml}
                    </tbody>
                </table>
            </div>

            <div class="form-actions">
                <button class="btn btn-outline" id="close-modal-btn">Yopish</button>
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

    // Initialize customers page
    renderCustomers(customers);

    // Setup search functionality
    const customerSearch = document.getElementById('customer-search');
    if (customerSearch) {
        customerSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            if (searchTerm) {
                const filteredCustomers = customers.filter(customer =>
                    customer.name.toLowerCase().includes(searchTerm) ||
                    customer.telegramUsername.toLowerCase().includes(searchTerm) ||
                    customer.phone.includes(searchTerm)
                );
                renderCustomers(filteredCustomers);
            } else {
                renderCustomers(customers);
            }
        });
    }
});