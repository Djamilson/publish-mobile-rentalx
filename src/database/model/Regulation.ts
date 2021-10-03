import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

class Regulation extends Model {
  static table = 'regulations';

  @field('regulation')
  regulation!: string;

  @field('reading_time')
  reading_time!: string;

  @date('updated_at_')
  updated_at_!: string;
}

export { Regulation };
