"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        Channels: (_, { teamName }) => {
            return teamName;
        },
    },
    Mutation: {
        createChannel: () => { },
    },
};
//# sourceMappingURL=resolvers.js.map