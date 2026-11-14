export interface ReportRow {
  readonly label: string;
  readonly value: number;
}

export interface Formatter {
  readonly extension: string;
  format(title: string, rows: readonly ReportRow[]): string;
}

export interface Destination {
  deliver(filename: string, content: string): Promise<void>;
}

export class CsvFormatter implements Formatter {
  readonly extension = 'csv';

  format(_title: string, rows: readonly ReportRow[]): string {
    const escape = (s: string): string => `"${s.replace(/"/g, '""')}"`;
    const lines = rows.map((r) => `${escape(r.label)},${r.value}`);
    return ['label,value', ...lines].join('\n');
  }
}

export class JsonFormatter implements Formatter {
  readonly extension = 'json';

  format(title: string, rows: readonly ReportRow[]): string {
    return JSON.stringify({ title, rows }, null, 2);
  }
}

export class ConsoleDestination implements Destination {
  async deliver(filename: string, content: string): Promise<void> {
    console.log(`--- ${filename} ---\n${content}`);
  }
}

export class MemoryDestination implements Destination {
  readonly files = new Map<string, string>();

  async deliver(filename: string, content: string): Promise<void> {
    this.files.set(filename, content);
  }
}

export class ReportService {
     private readonly formatter: Formatter;
    private readonly destination: Destination;
  constructor(
   formatter : Formatter,
   destination : Destination
  ) {
    this.destination = destination;
    this.formatter = formatter;
  }

  async run(title: string, rows: readonly ReportRow[]): Promise<void> {
    const content = this.formatter.format(title, rows);
    await this.destination.deliver(`${title}.${this.formatter.extension}`, content);
  }
}

async function main(): Promise<void> {
  const rows: ReportRow[] = [
    { label: 'Deposits, total', value: 12000 },
    { label: 'Withdrawals', value: 4500 },
  ];

  await new ReportService(new CsvFormatter(), new ConsoleDestination()).run('daily', rows);
  await new ReportService(new JsonFormatter(), new ConsoleDestination()).run('daily', rows);
}

void main();