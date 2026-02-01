type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: LogContext;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m", // Cyan
  info: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
};

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

class Logger {
  private context?: string;
  private isDev: boolean;
  private minLevel: LogLevel;

  constructor(context?: string) {
    this.context = context;
    this.isDev = process.env.NODE_ENV === "development";
    this.minLevel =
      (process.env.LOG_LEVEL as LogLevel) || (this.isDev ? "debug" : "info");
  }

  /**
   * Crée un logger enfant avec un contexte spécifique
   */
  child(context: string): Logger {
    const childContext = this.context ? `${this.context}:${context}` : context;
    return new Logger(childContext);
  }

  /**
   * Log de debug - visible uniquement en développement par défaut
   */
  debug(message: string, data?: LogContext): void {
    this.log("debug", message, data);
  }

  /**
   * Log d'information
   */
  info(message: string, data?: LogContext): void {
    this.log("info", message, data);
  }

  /**
   * Log d'avertissement
   */
  warn(message: string, data?: LogContext): void {
    this.log("warn", message, data);
  }

  /**
   * Log d'erreur
   */
  error(message: string, error?: Error | unknown, data?: LogContext): void {
    const errorData: LogContext = { ...data };

    if (error instanceof Error) {
      errorData.error = {
        name: error.name,
        message: error.message,
        stack: this.isDev ? error.stack : undefined,
      };
    } else if (error !== undefined) {
      errorData.error = error;
    }

    this.log(
      "error",
      message,
      Object.keys(errorData).length > 0 ? errorData : undefined,
    );
  }

  /**
   * Mesure le temps d'exécution d'une opération
   */
  time<T>(label: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.finally(() => {
          this.logDuration(label, start);
        }) as T;
      }
      this.logDuration(label, start);
      return result;
    } catch (error) {
      this.logDuration(label, start);
      throw error;
    }
  }

  /**
   * Version async de time()
   */
  async timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      return await fn();
    } finally {
      this.logDuration(label, start);
    }
  }

  private logDuration(label: string, start: number): void {
    const duration = (performance.now() - start).toFixed(2);
    this.debug(`${label} completed`, { durationMs: parseFloat(duration) });
  }

  private log(level: LogLevel, message: string, data?: LogContext): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(this.context && { context: this.context }),
      ...(data && { data }),
    };

    if (this.isDev) {
      this.printDev(entry);
    } else {
      this.printProd(entry);
    }
  }

  /**
   * Format lisible pour le développement avec couleurs
   */
  private printDev(entry: LogEntry): void {
    const color = COLORS[entry.level];
    const time = entry.timestamp.split("T")[1].slice(0, 12);
    const levelStr = entry.level.toUpperCase().padEnd(5);
    const contextStr = entry.context ? `${DIM}[${entry.context}]${RESET} ` : "";

    const prefix = `${DIM}${time}${RESET} ${color}${BOLD}${levelStr}${RESET}`;
    const message = `${prefix} ${contextStr}${entry.message}`;

    const logFn =
      entry.level === "error"
        ? console.error
        : entry.level === "warn"
          ? console.warn
          : console.log;

    if (entry.data) {
      logFn(message);
      console.log(
        DIM +
          "       " +
          JSON.stringify(entry.data, null, 2).split("\n").join("\n       ") +
          RESET,
      );
    } else {
      logFn(message);
    }
  }

  /**
   * Format JSON structuré pour la production (compatible avec les outils de monitoring)
   */
  private printProd(entry: LogEntry): void {
    const logFn =
      entry.level === "error"
        ? console.error
        : entry.level === "warn"
          ? console.warn
          : console.log;
    logFn(JSON.stringify(entry));
  }
}

// Instance singleton pour usage global
const logger = new Logger();

// Export de l'instance et de la classe
export { logger, Logger };
export type { LogLevel, LogContext, LogEntry };
