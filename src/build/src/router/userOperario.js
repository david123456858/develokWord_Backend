"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
const _pathBasic = "/basic";
route.get(`${_pathBasic}`, (req, res) => { res.json({ data: "bueno esto esta melo" }); });
