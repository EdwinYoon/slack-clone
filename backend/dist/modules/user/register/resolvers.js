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
const registerErrors_1 = require("./registerErrors");
exports.resolvers = {
    Mutation: {
        register: (_, { email, password, username }) => __awaiter(this, void 0, void 0, function* () {
            const duplicateEmail = yield entity_1.User.findOne({ where: { email } });
            if (duplicateEmail) {
                return {
                    errors: [registerErrors_1.duplicateEmailError],
                };
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = entity_1.User.create({
                email,
                username,
                password: hashedPassword,
            });
            yield user.save();
            return {
                approved: true,
            };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map