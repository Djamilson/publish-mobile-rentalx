import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';

import { User } from './model/User';
import { Car } from './model/Car';
import { Rental } from './model/Rental';
import { Regulation } from './model/Regulation';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Car, Rental, Regulation],
});
