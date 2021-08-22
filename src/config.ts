import dotEnv from 'dotenv';

dotEnv.config({ path: '.env' });

export const configuration = (): unknown => ({
  AppSettings: {
    port: process.env.PORT || 8080,
    bodyLimit: '50mb',
    bodyParameterLimit: 50_000_000,
    upStage: process.env.UP_STAGE
  },
  GraphQLSettings: {
    playground: true,
    debug: true,
    introspection: true,
    installSubscriptionHandlers: true
  },
  GraphQL_URLs: [],
  DbSettings: {
    connectionString: process.env.DB_URI
  },
  LoggerSettings: {
    level: 'info',
    silence: ['healthy', 'IntrospectionQuery']
  },
  CorsSettings: {
    allowedOrigins: [],
    allowedUrls: [],
    allowedPaths: [],
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    allowedCredentials: true
  },
  AwsSettings: {
    accessKeyId: process.env.AWS_MY_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_MY_SECRET_KEY,
    region: process.env.AWS_REGION
  },
  CognitoSettings: {
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    appClientId: process.env.COGNITO_APP_CLIENT_ID
  }
});
