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
const bcrypt = require("bcryptjs");
const entity_1 = require("../../../entity");
const loginErrors_1 = require("./loginErrors");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.resolvers = {
    Mutation: {
        login: (_, { email, password }, { res }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.User.findOne({ where: { email } });
            if (!user) {
                return {
                    errors: [loginErrors_1.invalidEmailError],
                };
            }
            const passwordValidation = yield bcrypt.compare(password, user.password);
            if (!passwordValidation) {
                return {
                    errors: [loginErrors_1.invalidPasswordError],
                };
            }
            const { AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET, } = process.env;
            const accessToken = jsonwebtoken_1.sign({ userId: user.id, count: user.count }, AUTH_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            const refreshToken = jsonwebtoken_1.sign({ userId: user.id, count: user.count }, AUTH_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            console.log(res);
            res.cookie('refresh-token', refreshToken, {
                expires: new Date(Date.now() + 60),
            });
            res.cookie('access-token', accessToken, { expires: Date.now() + 1800 });
            return {
                approved: true,
            };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map