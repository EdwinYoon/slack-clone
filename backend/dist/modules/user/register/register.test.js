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
const faker = require("faker");
const entity_1 = require("../../../entity");
const utils_1 = require("../../../utils");
const registerErrors_1 = require("./registerErrors");
faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();
const username = faker.name.findName();
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield utils_1.ormConnectionHandler();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
}));
describe('User Registration', () => {
    it('Expect to register a user', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield utils_1.register(email, password, username);
        expect(response).toEqual({ register: { approved: true, errors: null } });
        const users = yield entity_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
    }));
    it('Expect to check duplicate email', () => __awaiter(this, void 0, void 0, function* () {
        const duplicateEmailResponse = yield utils_1.register(email, password, username);
        expect(duplicateEmailResponse).toEqual({
            register: { approved: null, errors: [registerErrors_1.duplicateEmailError] },
        });
    }));
});
//# sourceMappingURL=register.test.js.map