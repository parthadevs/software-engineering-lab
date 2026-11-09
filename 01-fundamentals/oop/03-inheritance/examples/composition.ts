// is bad becouse Inheritance used only to reuse code.
class Logger {
  log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class BadOrderService extends Logger {
  place(id: string): void {
    this.log(`Order ${id} placed`);
  }
}

// is good becouse OrderService HAS-A logger (injected, swappable, mockable)
interface LoggerPort {
  log(message: string): void;
}

class ConsoleLogger implements LoggerPort {
  log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class OrderService {
  private readonly logger: LoggerPort;
  constructor(logger: LoggerPort) {
    this.logger = logger;
  }

  place(id: string): void {
    this.logger.log(`Order ${id} placed`);
  }
}

new OrderService(new ConsoleLogger()).place("ord-1");
