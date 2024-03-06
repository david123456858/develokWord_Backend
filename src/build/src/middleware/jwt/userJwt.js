"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const tokensHelpers_1 = require("@/helpers/tokensHelpers");
const checkJwt = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ data: "not found token" });
        }
        const decode = token === null || token === void 0 ? void 0 : token.split(' ').pop();
        const verify = decode ? decode : '';
        const newDecode = (0, tokensHelpers_1.userFrom)(verify);
        req.body = newDecode ? newDecode : undefined;
        next();
    }
    catch (error) {
        console.log("bueno paso fue aqui " + error);
    }
};
exports.checkJwt = checkJwt;
