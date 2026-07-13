export declare class StatusController {
    getStatus(): {
        uptime: number;
        heapMemory: number;
        nodeVersion: string;
        timestamp: string;
        projectName: string;
    };
}
