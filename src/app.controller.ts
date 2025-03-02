import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
    @Get()
    @ApiOperation({ description: 'health check' })
    getHello(): string {
        return 'Health check';
    }
}
