const express = require('express');
const authenticatedUserMiddleware = require('./../app/Http/Middleware/AuthenticatedUser');
const public_page_controller = require('../app/Http/Controllers/PublicPageController');
const user_panel_dashboard_controller = require('../app/Http/Controllers/UserDashboardController');
const user_panel_payment_controller = require('../app/Http/Controllers/PaymentController');
const MyAccountController = require('./../app/Http/Controllers/MyAccountController');

const Route = express.Router();

// ------------------ PUBLIC page route section ------------------
Route.get('/index', public_page_controller.index);

// ------------------ USER panel route section ------------------
Route.get('/user-panel/dashboard/index', authenticatedUserMiddleware, user_panel_dashboard_controller.index);

Route.get('/user-panel/dashboard/payment/list', authenticatedUserMiddleware, user_panel_payment_controller.index);
Route.post('/user-panel/dashboard/payment/store', authenticatedUserMiddleware, user_panel_payment_controller.store);

Route.get('/user-panel/dashboard/my-account', authenticatedUserMiddleware, MyAccountController.index);
Route.put('/user-panel/dashboard/my-account-update', authenticatedUserMiddleware, MyAccountController.update);

module.exports = {
	routes: Route
}
