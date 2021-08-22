import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CoreModule } from './core/core.module';
import GraphQLModule from './graphql/graphql.module';
import { LoaderProvider } from './graphql/loader/loader.prodiver';
import { GraphQLUploadModule } from './graphql/upload/upload.module';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { LoggerModule } from './logger/logger.module';
import { SharedModule } from './shared/shared.module';
import { configuration } from './config';

@Module({
  imports: [
    LoggerModule,
    GraphQLModule,
    GraphQLUploadModule,
    CoreModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  providers: [LoaderProvider],
  controllers: [HealthCheckController]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // consumer
    //   .apply(OAuthMiddleware)
    //   .exclude(
    //     { path: 'oauth', method: RequestMethod.ALL },
    //     { path: 'healthz', method: RequestMethod.ALL },
    //     { path: 'swagger', method: RequestMethod.ALL },
    //   )
    //   .forRoutes(
    //     { path: 'graphql', method: RequestMethod.POST },
    //     { path: 'graphql', method: RequestMethod.OPTIONS },
    //   );
  }
}
