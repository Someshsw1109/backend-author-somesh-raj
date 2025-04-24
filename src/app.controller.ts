/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  gethealth() {
    return this.appService.checkHealth();
  }
}
