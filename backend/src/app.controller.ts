import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/** Main application controller */
@Controller()
export class AppController {
  /** Dependency injection of AppService */
  constructor(private readonly appService: AppService) {}
}
