import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import * as process from 'process';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api/status')
export class StatusController {
  @Get()
  getStatus() {
    const uptime = os.uptime(); // Server uptime in seconds
    const memoryUsage = process.memoryUsage();
    const heapUsed = memoryUsage.heapUsed / 1024 / 1024; // Heap memory usage in MB
    const nodeVersion = process.version; // Node.js version
    const currentTimestamp = new Date().toISOString(); // Current timestamp

    let projectName = 'N/A';
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      projectName = packageJson.name;
    } catch (error) {
      console.error('Error reading package.json:', error);
    }

    return {
      uptime: Math.floor(uptime),
      heapMemory: parseFloat(heapUsed.toFixed(2)),
      nodeVersion,
      timestamp: currentTimestamp,
      projectName,
    };
  }
}
