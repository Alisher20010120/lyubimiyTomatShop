// // Admin authentication JavaScript
//
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is authenticated
//     const adminAuth = localStorage.getItem('adminAuth');
//     if (!adminAuth) {
//         // Redirect to login page if not authenticated
//         window.location.href = 'login.html';
//         return;
//     }
//
//     // Setup logout functionality
//     const logoutButton = document.getElementById('logout-button');
//     const headerLogoutButton = document.getElementById('header-logout-button');
//
//     if (logoutButton) {
//         logoutButton.addEventListener('click', function() {
//             localStorage.removeItem('adminAuth');
//             window.location.href = 'login.html';
//         });
//     }
//
//     if (headerLogoutButton) {
//         headerLogoutButton.addEventListener('click', function() {
//             localStorage.removeItem('adminAuth');
//             window.location.href = 'login.html';
//         });
//     }
//
//     // Setup sidebar toggle for mobile
//     const sidebarToggle = document.getElementById('sidebar-toggle');
//     const sidebar = document.getElementById('admin-sidebar');
//     const sidebarClose = document.getElementById('sidebar-close');
//
//     if (sidebarToggle && sidebar) {
//         sidebarToggle.addEventListener('click', function() {
//             sidebar.classList.add('open');
//         });
//     }
//
//     if (sidebarClose && sidebar) {
//         sidebarClose.addEventListener('click', function() {
//             sidebar.classList.remove('open');
//         });
//     }
// });