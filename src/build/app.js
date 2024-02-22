"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get("/", (req, res) => {
    res.send("funciona lo basico");
});
app.listen(PORT, () => {
    console.log(`El servidor esta escuchando http://localhost:${PORT}`);
});
