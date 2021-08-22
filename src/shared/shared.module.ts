import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { DatabaseProvider, MONGO_CONNECTION } from './database.provider';
import { repositories, RepositoriesProvider } from './repositories.provider';
import { CognitoService } from './services/cognito.service';

const providers = [
  ...DatabaseProvider,
  ...RepositoriesProvider,
  CognitoService
];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, ...repositories, HttpModule, MONGO_CONNECTION]
})
export class SharedModule {}
