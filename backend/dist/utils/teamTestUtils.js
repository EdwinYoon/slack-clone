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
function createTeam(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const createTeamMutation = `
    mutation {
      createTeam(name: "${name}") {
        approved
        errors {
          path
          message
        }
      }
    }
  `;
        const response = yield graphql_request_1.request(process.env.TEST_HOST, createTeamMutation);
        return response;
    });
}
exports.createTeam = createTeam;
//# sourceMappingURL=teamTestUtils.js.map