"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const tokensHelpers_1 = require("@/helpers/tokensHelpers");
//verificar usuario 
const verifyToken = (req, res) => {
    console.log(req.body);
    const user = {
        user: "kadir",
        passWords: "ayValentina"
    };
    const token = (0, tokensHelpers_1.tokenSing)(user);
    res.json({ data: token });
};
exports.verifyToken = verifyToken;
