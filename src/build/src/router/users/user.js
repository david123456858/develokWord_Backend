"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@/controller/user/user");
const express_1 = require("express");
const routeBase = 'api/v1/user/';
const routeUser = (0, express_1.Router)();
routeUser.get(`${routeBase}/authentication`, user_1.verifyToken);
exports.default = routeUser;
