import { Controller, Get, Module } from '@nestjs/common';

@Controller('api')
class HealthController {
  @Get('healthz')
  health(): { status: 'ok' } {
    return { status: 'ok' };
  }
}

@Module({ controllers: [HealthController] })
export class AppModule {}
