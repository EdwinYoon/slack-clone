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
const graphql_request_1 = require("graphql-request");
const TEST_URL = process.env.TEST_HOST;
function register(email, password, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const registerMutation = `
    mutation {
      register(email: "${email}", password: "${password}", username: "${username}") {
        approved
        errors {
          path
          message
        }
      }
    } 
  `;
        const response = yield graphql_request_1.request(TEST_URL, registerMutation);
        return response;
    });
}
exports.register = register;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginMutation = `
  mutation {
    login(email: "${email}", password: "${password}") {
      approved
      errors {
        path
        message 
      }
    }
  }`;
        const response = yield graphql_request_1.request(TEST_URL, loginMutation);
        return response;
    });
}
exports.login = login;
//# sourceMappingURL=userTestUtiles.js.map