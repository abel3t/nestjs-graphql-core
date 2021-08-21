import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('healthy')
@Controller('healthy')
export class HealthCheckController {
  @Get()
  healthy(): unknown {
    return { message: 'OK' };
  }
}
