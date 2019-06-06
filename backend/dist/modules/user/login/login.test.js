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
const utils_1 = require("../../../utils");
const loginErrors_1 = require("./loginErrors");
const utils_2 = require("../../../utils");
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
describe('User Login', () => {
    test('Expected a user to login successfully.', () => __awaiter(this, void 0, void 0, function* () {
        yield utils_2.register(email, password, username);
        const loginRes = yield utils_2.login(email, password);
        expect(loginRes).toEqual({ login: { approved: true, errors: null } });
    }));
    test('Expected invalid email error', () => __awaiter(this, void 0, void 0, function* () {
        yield utils_2.register(email, password, username);
        const badEmail = `11${email}`;
        const response = yield utils_2.login(badEmail, password);
        expect(response).toEqual({
            login: { approved: null, errors: [loginErrors_1.invalidEmailError] },
        });
    }));
    test('Expected invalid password error', () => __awaiter(this, void 0, void 0, function* () {
        yield utils_2.register(email, password, username);
        const badPassword = `11${password}`;
        const response = yield utils_2.login(email, badPassword);
        expect(response).toEqual({
            login: { approved: null, errors: [loginErrors_1.invalidPasswordError] },
        });
    }));
});
//# sourceMappingURL=login.test.js.map