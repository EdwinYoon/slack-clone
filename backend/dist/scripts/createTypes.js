"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_schema_1 = require("@gql2ts/from-schema");
const fs = require("fs");
const path = require("path");
const utils_1 = require("../utils");
const typescriptTypes = from_schema_1.generateNamespace('GQL', utils_1.generateSchemas());
fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), typescriptTypes, err => {
    console.log(err);
});
//# sourceMappingURL=createTypes.js.map