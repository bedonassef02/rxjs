const {
    from, fromEvent, fromEventPattern, generate, interval, combineLatest, Subject
} = require('rxjs');
const {
    map, filter, scan, take, takeWhile, mergeMap, catchError, tap, startWith
} = require('rxjs/operators');
const express = require('express');
const WebSocket = require('ws');
const axios = require('axios');

// 1. Server Monitoring System using interval()
class ServerMonitor {
    constructor() {
        this.cpuUsage$ = interval(1000).pipe(map(() => Math.random() * 100), scan((acc, curr) => {
            // Keep last 5 readings
            return [...acc.slice(-4), curr];
        }, []));

        this.memoryUsage$ = interval(1500).pipe(map(() => 1000 + Math.random() * 500));
    }

    startMonitoring() {
        combineLatest([this.cpuUsage$, this.memoryUsage$])
            .pipe(takeWhile(([cpu]) => cpu[cpu.length - 1] < 95) // Stop if CPU hits 95%
            )
            .subscribe(([cpuHistory, memory]) => {
                const currentCpu = cpuHistory[cpuHistory.length - 1];
                console.log(`CPU: ${currentCpu.toFixed(1)}% (trend: ${this.calculateTrend(cpuHistory)}), Memory: ${memory.toFixed(1)}MB`);
            });
    }

    calculateTrend(readings) {
        if (readings.length < 2) return 'stable';
        const last = readings[readings.length - 1];
        const prev = readings[readings.length - 2];
        return last > prev ? '↑ rising' : last < prev ? '↓ falling' : '→ stable';
    }
}

// 2. API Health Checker using from() with promises
class ApiHealthChecker {
    constructor(endpoints) {
        this.endpoints = endpoints;
        this.statusSubject = new Subject();
    }

    checkAll() {
        from(this.endpoints).pipe(mergeMap(url => from(axios.get(url).catch(err => ({
            url,
            status: 'down',
            error: err.message
        }))).pipe(map(response => ({
            url: response.config?.url || url,
            status: response.status === 200 ? 'up' : 'down',
            responseTime: response.duration
        })), catchError(error => of({
            url,
            status: 'down',
            error: error.message
        }))))).subscribe(result => this.statusSubject.next(result));
    }
}

// 3. WebSocket Event Processor using fromEvent()
class WebSocketServer {
    constructor(port) {
        this.app = express();
        this.server = this.app.listen(port);
        this.wss = new WebSocket.Server({server: this.server});

        this.connections$ = fromEvent(this.wss, 'connection').pipe(map(ws => {
            console.log('New client connected');
            return fromEvent(ws, 'message').pipe(map(msg => ({ws, data: JSON.parse(msg)})));
        }), mergeMap(ws$ => ws$));

        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get('/', (req, res) => res.send('Monitoring System Running'));
    }
}

// 4. File Watcher using fromEventPattern()
class FileWatcher {
    constructor(filename) {
        this.fs = require('fs');
        this.filename = filename;
        this.watcher = null;
    }

    watch() {
        return fromEventPattern(handler => {
            this.watcher = this.fs.watch(this.filename, handler);
        }, handler => {
            if (this.watcher) this.watcher.close();
        }).pipe(map(([eventType, filename]) => ({eventType, filename, timestamp: Date.now()})));
    }
}

// 5. Alert Generator using generate() and EMPTY
class AlertSystem {
    constructor(monitor, threshold = 90) {
        this.monitor = monitor;
        this.threshold = threshold;
        this.alertHistory = [];
    }

    start() {
        generate(0, () => true, // Run indefinitely
            x => x + 1).pipe(mergeMap(() => this.monitor.cpuUsage$), filter(cpuReadings => {
            const current = cpuReadings[cpuReadings.length - 1];
            return current > this.threshold && !this.alertHistory.some(alert => Date.now() - alert.timestamp < 60000);
        })).subscribe(cpuReadings => {
            const alert = {
                type: 'HIGH_CPU', value: cpuReadings[cpuReadings.length - 1], timestamp: Date.now()
            };
            this.alertHistory.push(alert);
            console.warn(`ALERT: ${alert.type} - ${alert.value.toFixed(1)}%`);
        });
    }
}

// 6. Main Application
class MonitoringSystem {
    constructor() {
        this.serverMonitor = new ServerMonitor();
        this.apiChecker = new ApiHealthChecker(['https://jsonplaceholder.typicode.com/posts/1', 'https://httpbin.org/get', 'https://nonexistent-api.example.com' // Will fail
        ]);
        this.wsServer = new WebSocketServer(8080);
        this.fileWatcher = new FileWatcher(__filename);
        this.alertSystem = new AlertSystem(this.serverMonitor, 85);
    }

    start() {
        console.log('Starting monitoring system...');

        // Start monitoring server metrics
        this.serverMonitor.startMonitoring();

        // Check API health every 30 seconds
        interval(30000).pipe(startWith(0)).subscribe(() => this.apiChecker.checkAll());

        // Process WebSocket messages
        this.wsServer.connections$.subscribe(({ws, data}) => {
            console.log('WS Message:', data);
            ws.send(JSON.stringify({response: 'Message received', yourData: data}));
        });

        // Watch for file changes
        this.fileWatcher.watch().subscribe(event => {
            console.log('File changed:', event);
        });

        // Start alert system
        this.alertSystem.start();

        // API status updates
        this.apiChecker.statusSubject.subscribe(status => {
            console.log('API Status:', status);
        });
    }
}

// Run the system
const monitoringSystem = new MonitoringSystem();
monitoringSystem.start();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down monitoring system...');
    process.exit();
});