import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from '../../src/status/status.controller';

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
    // Mock process.uptime and process.memoryUsage for consistent test results
    const mockUptime = 1234.567;
    const mockHeapUsed = 50 * 1024 * 1024; // 50 MB
    const mockNodeVersion = 'v18.12.1';
    const mockTimestamp = 1678886400000; // A fixed timestamp

    Object.defineProperty(process, 'uptime', {
      value: () => mockUptime,
      configurable: true,
    });
    Object.defineProperty(process, 'memoryUsage', {
      value: () => ({ heapUsed: mockHeapUsed }),
      configurable: true,
    });
    Object.defineProperty(process, 'version', {
      value: mockNodeVersion,
      configurable: true,
    });

    const mockRequest = {} as any; // Mock request object

    const status = controller.getStatus(mockRequest);

    expect(status).toBeDefined();
    expect(status.uptime).toBe(Math.floor(mockUptime));
    expect(status.heapMemory).toBe(parseFloat((mockHeapUsed / 1024 / 1024).toFixed(2)));
    expect(status.nodeVersion).toBe(mockNodeVersion);
    expect(status.timestamp).toBeGreaterThan(mockTimestamp - 1000); // Check within a reasonable range
    expect(status.projectName).toBe(process.env.npm_package_name || 'compi-poc');
  });
});
