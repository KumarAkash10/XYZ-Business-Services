const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Simple logger utility
 */
class Logger {
  constructor() {
    this.logFile = path.join(logsDir, 'app.log');
    this.errorFile = path.join(logsDir, 'error.log');
  }

  /**
   * Format log message
   */
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaString}\n`;
  }

  /**
   * Write to log file
   */
  writeToFile(filename, message) {
    try {
      fs.appendFileSync(filename, message);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  /**
   * Info level logging
   */
  info(message, meta = {}) {
    const formattedMessage = this.formatMessage('info', message, meta);
    
    if (process.env.NODE_ENV !== 'test') {
      console.log(formattedMessage.trim());
    }
    
    this.writeToFile(this.logFile, formattedMessage);
  }

  /**
   * Error level logging
   */
  error(message, meta = {}) {
    const formattedMessage = this.formatMessage('error', message, meta);
    
    if (process.env.NODE_ENV !== 'test') {
      console.error(formattedMessage.trim());
    }
    
    this.writeToFile(this.errorFile, formattedMessage);
    this.writeToFile(this.logFile, formattedMessage);
  }

  /**
   * Warning level logging
   */
  warn(message, meta = {}) {
    const formattedMessage = this.formatMessage('warn', message, meta);
    
    if (process.env.NODE_ENV !== 'test') {
      console.warn(formattedMessage.trim());
    }
    
    this.writeToFile(this.logFile, formattedMessage);
  }

  /**
   * Debug level logging
   */
  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      const formattedMessage = this.formatMessage('debug', message, meta);
      console.log(formattedMessage.trim());
      this.writeToFile(this.logFile, formattedMessage);
    }
  }

  /**
   * HTTP request logging
   */
  http(req, res, responseTime) {
    const message = `${req.method} ${req.originalUrl} - ${res.statusCode} - ${responseTime}ms`;
    const meta = {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.userId
    };
    
    this.info(message, meta);
  }
}

module.exports = new Logger();
