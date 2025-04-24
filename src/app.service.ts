/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    const uptime = process.uptime();
    const { heapTotal, heapUsed } = process.memoryUsage();
    return {
      uptime: `${uptime.toFixed(2)} seconds`,
      memoryUsed: `${Math.round(heapUsed / 1000000)} MB`,
      memoryTotal: `${Math.round(heapTotal / 1000000)} MB`,
    };
  }
}
