import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import * as os from 'os';

@Controller('api/status')
export class StatusController {
  private projectName: string;

  constructor() {
    // This would ideally be loaded from a configuration service or package.json
    // For this exercise, we'll hardcode or read it in a simple way.
    this.projectName = process.env.npm_package_name || 'compi-poc'; // Fallback
  }

  @Get()
  getStatus(@Req() req: Request) {
    const uptime = process.uptime(); // in seconds
    const heapUsed = process.memoryUsage().heapUsed / 1024 / 1024; // in MB
    const nodeVersion = process.version;
    const timestamp = Date.now();

    return {
      uptime: Math.floor(uptime),
      heapMemory: parseFloat(heapUsed.toFixed(2)),
      nodeVersion: nodeVersion,
      timestamp: timestamp,
      projectName: this.projectName,
    };
  }
}
