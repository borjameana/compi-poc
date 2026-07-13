import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import * as os from 'os';
import * as process from 'process';
import * as fs from 'fs';

jest.mock('fs');
import * as path from 'path';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status information', () => {
    const mockUptime = 12345;
    jest.spyOn(process, 'uptime').mockReturnValue(mockUptime);

    const mockMemoryUsage = {
      rss: 1024 * 1024 * 100, // 100 MB
      heapTotal: 1024 * 1024 * 80,
      heapUsed: 1024 * 1024 * 50, // 50 MB
      external: 0,
      arrayBuffers: 0,
    };
    jest.spyOn(process, 'memoryUsage').mockReturnValue(mockMemoryUsage);

    const mockNodeVersion = 'v18.12.0';
    Object.defineProperty(process, 'version', { value: mockNodeVersion });

    const mockProjectName = 'my-test-project';
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ name: mockProjectName }));
    jest.spyOn(path, 'join').mockReturnValue('/mock/path/to/package.json');

    const status = controller.getStatus();

    expect(status).toHaveProperty('uptime');
    expect(typeof status.uptime).toBe('number');
    expect(status.uptime).toBe(Math.floor(mockUptime));

    expect(status).toHaveProperty('heapMemory');
    expect(typeof status.heapMemory).toBe('number');
    expect(status.heapMemory).toBe(parseFloat((mockMemoryUsage.heapUsed / 1024 / 1024).toFixed(2)));

    expect(status).toHaveProperty('nodeVersion');
    expect(typeof status.nodeVersion).toBe('string');
    expect(status.nodeVersion).toBe(mockNodeVersion);

    expect(status).toHaveProperty('timestamp');
    expect(typeof status.timestamp).toBe('string');
    // Check if it's a valid ISO string, but don't compare exact time due to test execution time
    expect(() => new Date(status.timestamp).toISOString()).not.toThrow();

    expect(status).toHaveProperty('projectName');
    expect(typeof status.projectName).toBe('string');
    expect(status.projectName).toBe(mockProjectName);
  });

  it('should handle package.json not found gracefully', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });
    const status = controller.getStatus();
    expect(status.projectName).toBe('N/A');
  });
});
