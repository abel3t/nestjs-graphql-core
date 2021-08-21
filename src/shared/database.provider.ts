import { Provider } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export const MONGO_CONNECTION = 'MONGO_CONNECTION';

export const DatabaseProvider: Provider[] = [
  {
    provide: MONGO_CONNECTION,
    useFactory: () =>
      createConnection({
        name: MONGO_CONNECTION,
        type: 'mongodb',
        url: process.env.DB_URI,
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        authSource: 'admin',
        readPreference: 'primary',
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as MongoConnectionOptions)
  }
];
