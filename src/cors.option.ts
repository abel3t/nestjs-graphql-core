import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Request } from 'express';

import { cors_not_allowed } from './common/errors';
import { getOrigin, getPath } from './common/helpers/req.helper';
import { configuration } from './config';

export const corsOptionsDelegate: unknown = (
  req: Request,
  callback: (err: Error, options: CorsOptions) => void
) => {
  const settings: any = configuration();
  const corsSettings: ICorsSettings = settings.CorsSettings;
  const corsOptions: CorsOptions = {
    methods: corsSettings.allowedMethods,
    credentials: corsSettings.allowedCredentials,
    origin: false
  };
  let error: Error | null;

  const origin = getOrigin(req);
  const url = getPath(req);

  if (
    !origin ||
    !corsSettings.allowedOrigins.length ||
    corsSettings.allowedOrigins.includes(origin)
  ) {
    corsOptions.origin = true;
    error = undefined;
  } else if (
    corsSettings.allowedUrls.length &&
    corsSettings.allowedUrls.includes(url)
  ) {
    corsOptions.origin = true;
    error = undefined;
  } else {
    corsOptions.origin = false;
    error = cors_not_allowed({ raise: false });
  }

  callback(error, corsOptions);
};
