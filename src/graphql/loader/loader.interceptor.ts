import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

const generateDataLoaders = () => ({});

@Injectable()
export class LoaderInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<unknown> | Promise<Observable<unknown>> {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = gqlExecutionContext.getContext();

    const loaders = generateDataLoaders();

    for (const key of Object.keys(loaders)) {
      ctx[key] = loaders[key];
    }

    return next.handle();
  }
}
