interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[console] ${message}`);
  }
}

class JsonLogger implements Logger {
  log(message: string): void {
    console.log(
      JSON.stringify({ level: "info", message, at: new Date().toISOString() }),
    );
  }
}

class MemoryLogger implements Logger {
  readonly lines: string[] = [];

  log(message: string): void {
    this.lines.push(message); // handy in tests
  }
}

class CheckoutService {
  private readonly logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  checkout(orderId: string): void {
    this.logger.log(`Order ${orderId} checked out`);
  }
}
const consolelog = new ConsoleLogger();
const checkout = new CheckoutService(consolelog)
checkout.checkout('ord-1');
