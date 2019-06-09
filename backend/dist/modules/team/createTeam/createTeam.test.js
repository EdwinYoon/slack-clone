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
const entity_1 = require("../../../entity");
const createTeamErrors_1 = require("./createTeamErrors");
faker.seed(Date.now() + 5);
const coolTeamName = `${faker.name.findName()}-${faker.name.findName()}`;
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield utils_1.ormConnectionHandler();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () { return conn.close(); }));
describe('Create Team', () => {
    test('Expected to create a new team', () => __awaiter(this, void 0, void 0, function* () {
        const newTeam = yield utils_1.createTeam(coolTeamName);
        expect(newTeam).toEqual({ createTeam: { approved: true, errors: null } });
        const team = yield entity_1.Team.find({ where: { name: coolTeamName } });
        expect(team).toHaveLength(1);
    }));
    test('Expected to check duplicate team name', () => __awaiter(this, void 0, void 0, function* () {
        const duplicateNameTeamCreation = yield utils_1.createTeam(coolTeamName);
        expect(duplicateNameTeamCreation).toEqual({
            createTeam: { approved: null, errors: [createTeamErrors_1.duplicateNameError] },
        });
    }));
});
//# sourceMappingURL=createTeam.test.js.map