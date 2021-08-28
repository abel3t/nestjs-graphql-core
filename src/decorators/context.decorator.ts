import 'reflect-metadata';

import { PipeTransform, Type } from '@nestjs/common';

export declare function Context(): ParameterDecorator;
export declare function Context(
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator;
export declare function Context(
  property: string,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator;
