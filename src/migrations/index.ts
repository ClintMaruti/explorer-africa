import * as migration_20250601_154431 from './20250601_154431';

export const migrations = [
  {
    up: migration_20250601_154431.up,
    down: migration_20250601_154431.down,
    name: '20250601_154431'
  },
];
