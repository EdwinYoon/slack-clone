import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';
import { generateSchemas } from '../utils';

const typescriptTypes = generateNamespace('GQL', generateSchemas());

fs.writeFile(
  path.join(__dirname, '../types/schema.d.ts'),
  typescriptTypes,
  err => {
    console.log(err);
  }
);
