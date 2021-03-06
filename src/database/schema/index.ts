import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { carSchema } from './carSchema';
import { rentalSchema } from './rentalSchema';
import { regulationSchema } from './regulationSchema';

const schemas = appSchema({
  version: 1,
  tables: [userSchema, carSchema, rentalSchema, regulationSchema],
});

export { schemas };
