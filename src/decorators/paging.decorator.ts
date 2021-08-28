import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { DEFAULT_MAX_LIMIT } from '../common/constant';

interface IPaginationParams {
  maxLimit?: number;
}

export interface ICustomPagination {
  page: number;
  limit: number;
}

export const PaginationParams = createParamDecorator(
  (data: IPaginationParams, ctx: ExecutionContext): ICustomPagination => {
    data = data ? data : { maxLimit: DEFAULT_MAX_LIMIT };

    const request = ctx.switchToHttp().getRequest();

    const queries: ICustomPagination = request.query;

    queries.page = queries.page || 1;
    queries.limit = queries.limit || data?.maxLimit || DEFAULT_MAX_LIMIT;

    if (data?.maxLimit && queries.limit > data?.maxLimit) {
      queries.limit = data?.maxLimit;
    }

    return {
      page: +queries.page || 1,
      limit: +queries.limit || DEFAULT_MAX_LIMIT
    };
  },
  [
    (target: never, key: string) => {
      ApiQuery({
        name: 'page',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
      ApiQuery({
        name: 'limit',
        schema: { default: DEFAULT_MAX_LIMIT, type: 'number', minimum: 1 },
        required: false
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
    }
  ]
);
