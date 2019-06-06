"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const path = require("path");
const fs = require("fs");
const graphql_tools_1 = require("graphql-tools");
const glob = require("glob");
exports.default = () => {
    const basePath = path.join(__dirname, '../modules');
    const types = glob
        .sync(`${basePath}/**/*.graphql`)
        .map(x => fs.readFileSync(x, { encoding: 'utf8' }));
    const resolvers = glob
        .sync(`${basePath}/**/resolvers.?s`)
        .map(resolver => require(resolver).resolvers);
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: merge_graphql_schemas_1.mergeTypes(types),
        resolvers: merge_graphql_schemas_1.mergeResolvers(resolvers),
    });
};
//# sourceMappingURL=generateSchemas.js.map