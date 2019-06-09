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
require("reflect-metadata");
const graphql_yoga_1 = require("graphql-yoga");
const cookieParser = require("cookie-parser");
const utils_1 = require("./utils");
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const schema = utils_1.generateSchemas();
    const server = yield new graphql_yoga_1.GraphQLServer({
        schema,
        context: ({ request, response }) => ({ req: request, res: response }),
    });
    server.express.use(cookieParser());
    server.express.use(utils_1.authTokenValidator);
    yield utils_1.ormConnectionHandler();
    const port = process.env.APP_PORT || 4000;
    const app = yield server.start({ port });
    console.log(`Server is not running at ${port}`);
    return app;
});
//# sourceMappingURL=InitializeServer.js.map