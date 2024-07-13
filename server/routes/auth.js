const express = require('express');
const authentication_controller = require('../app/Http/Controllers/AuthenticationController');

const Route = express.Router();

Route.post('/login', authentication_controller.login);
Route.post('/registration', authentication_controller.registration);

module.exports = {
	routes: Route
}
