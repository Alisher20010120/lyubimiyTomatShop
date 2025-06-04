// Admin settings page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Store settings form
    const storeSettingsForm = document.getElementById('store-settings-form');
    if (storeSettingsForm) {
        storeSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const storeName = document.getElementById('store-name').value;
            const storeDescription = document.getElementById('store-description').value;
            const storeAddress = document.getElementById('store-address').value;
            const storePhone = document.getElementById('store-phone').value;
            const storeEmail = document.getElementById('store-email').value;

            // In a real app, you would send this data to the server
            console.log('Store settings saved:', {
                name: storeName,
                description: storeDescription,
                address: storeAddress,
                phone: storePhone,
                email: storeEmail
            });

            // Show success message
            alert('Do\'kon ma\'lumotlari saqlandi!');
        });
    }

    // Telegram bot settings form
    const telegramSettingsForm = document.getElementById('telegram-settings-form');
    if (telegramSettingsForm) {
        telegramSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const botUsername = document.getElementById('bot-username').value;
            const botToken = document.getElementById('bot-token').value;

            // In a real app, you would send this data to the server
            console.log('Telegram bot settings saved:', {
                username: botUsername,
                token: botToken
            });

            // Show success message
            alert('Telegram bot sozlamalari saqlandi!');
        });
    }

    // Admin account settings form
    const adminSettingsForm = document.getElementById('admin-settings-form');
    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const adminUsername = document.getElementById('admin-username').value;
            const currentPassword = document.getElementById('admin-current-password').value;
            const newPassword = document.getElementById('admin-new-password').value;
            const confirmPassword = document.getElementById('admin-confirm-password').value;

            // Validate form
            if (currentPassword === '') {
                alert('Joriy parolni kiriting!');
                return;
            }

            if (newPassword !== '') {
                if (newPassword !== confirmPassword) {
                    alert('Yangi parol va tasdiqlash paroli mos kelmaydi!');
                    return;
                }

                // Check current password (in a real app, this would be done on the server)
                if (currentPassword !== 'password') {
                    alert('Joriy parol noto\'g\'ri!');
                    return;
                }
            }

            // In a real app, you would send this data to the server
            console.log('Admin settings saved:', {
                username: adminUsername,
                password: newPassword !== '' ? newPassword : undefined
            });

            // Show success message
            alert('Admin hisob sozlamalari saqlandi!');

            // Clear password fields
            document.getElementById('admin-current-password').value = '';
            document.getElementById('admin-new-password').value = '';
            document.getElementById('admin-confirm-password').value = '';
        });
    }
});