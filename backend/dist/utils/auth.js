"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const entity_1 = require("../entity");
exports.generateTokens = (user) => {
    const { AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } = process.env;
    const accessToken = jsonwebtoken_1.sign({ userId: user.id, count: user.count }, AUTH_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.sign({ userId: user.id, count: user.count }, AUTH_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
exports.authTokenValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const accessToken = req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken && !accessToken) {
        return next();
    }
    try {
        const isTokenValid = jsonwebtoken_1.verify(accessToken, process.env
            .AUTH_ACCESS_TOKEN_SECRET);
        req.userId = isTokenValid.userId;
        return next();
    }
    catch (_a) { }
    if (!refreshToken) {
        return next();
    }
    try {
        const isTokenValid = jsonwebtoken_1.verify(refreshToken, process.env
            .AUTH_REFRESH_TOKEN_SECRET);
        const user = yield entity_1.User.findOne(isTokenValid.userId);
        if (!user || user.count !== isTokenValid.count) {
            return next();
        }
        const newTokens = exports.generateTokens(user);
        res.cookie('refresh-token', newTokens.refreshToken);
        res.cookie('access-token', newTokens.accessToken);
        return next();
    }
    catch (_b) {
        return next();
    }
});
//# sourceMappingURL=auth.js.map