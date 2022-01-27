import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

export const connectionOptions = {
  type: 'sqlite',
  name: 'default',
  database: join(__dirname, '..', 'db.sqlite'),
  migrationsRun: true,
  synchronize: true,
  dropSchema: false,
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
  entities: [join(__dirname, '**/*.entity.ts'), 'dist/**/**.entity.js'],
} as ConnectionOptions;
