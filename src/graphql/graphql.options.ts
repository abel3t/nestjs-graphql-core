import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Request } from 'express';
import { GraphQLError, GraphQLSchema } from 'graphql';

import { corsOptionsDelegate } from '../cors.option';
import { User } from '../shared/entities/user.entity';
import { StitchingService } from './stitching/stitching.service';
import { GraphQLUpload } from './upload/upload.scalar';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(
    private readonly stitchingService: StitchingService,
    private configService: ConfigService
  ) {}

  public createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    const appSettings = this.configService.get<IAppSettings>('AppSettings');
    const graphQLSettings =
      this.configService.get<IAppSettings>('GraphQLSettings');
    return {
      ...graphQLSettings,
      autoSchemaFile: __dirname + '/schema.graphql',
      formatError: (err: GraphQLError) => err,
      context: ({ req }: { req: Request & { user?: User } }) => ({
        req,
        user: req.user
      }),
      cors: corsOptionsDelegate,
      bodyParserConfig: {
        limit: appSettings.bodyLimit
      },
      uploads: false,
      transformSchema: async (schema: GraphQLSchema) => {
        const uploadSchema = makeExecutableSchema({
          typeDefs: `
            scalar Upload
          `,
          resolvers: {
            Upload: GraphQLUpload
          }
        });

        const schemas: GraphQLSchema[] = [
          schema,
          uploadSchema,
          ...(await this.stitchingService.schemas()).filter(Boolean)
        ];

        return stitchSchemas({
          subschemas: schemas
        });
      }
    };
  }
}
