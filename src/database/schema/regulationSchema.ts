import { tableSchema } from '@nozbe/watermelondb';

const regulationSchema = tableSchema({
  name: 'regulations',
  columns: [
    {
      name: 'regulation',
      type: 'string',
    },

    { name: 'reading_time', type: 'string' },

    {
      name: 'updated_at_',
      type: 'string',
    },
  ],
});

export { regulationSchema };
