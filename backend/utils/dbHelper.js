const { sequelize } = require('../models');

/**
 * Database utility functions
 */
class DatabaseHelper {
  /**
   * Test database connection
   */
  async testConnection() {
    try {
      await sequelize.authenticate();
      return { success: true, message: 'Database connection successful' };
    } catch (error) {
      return { success: false, message: 'Database connection failed', error: error.message };
    }
  }

  /**
   * Execute raw SQL query
   */
  async executeQuery(query, replacements = {}) {
    try {
      const [results, metadata] = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT
      });
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats() {
    try {
      const stats = {};

      // Get table sizes
      const tableSizes = await sequelize.query(`
        SELECT 
          schemaname,
          tablename,
          pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
          pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
      `, { type: sequelize.QueryTypes.SELECT });

      stats.tableSizes = tableSizes;

      // Get database size
      const dbSize = await sequelize.query(`
        SELECT pg_size_pretty(pg_database_size(current_database())) as database_size;
      `, { type: sequelize.QueryTypes.SELECT });

      stats.databaseSize = dbSize[0]?.database_size;

      // Get connection info
      const connections = await sequelize.query(`
        SELECT count(*) as active_connections 
        FROM pg_stat_activity 
        WHERE state = 'active';
      `, { type: sequelize.QueryTypes.SELECT });

      stats.activeConnections = connections[0]?.active_connections;

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Backup database (placeholder)
   */
  async backupDatabase() {
    // In a real application, you would implement database backup logic
    // This could involve pg_dump for PostgreSQL
    return { success: true, message: 'Backup functionality not implemented' };
  }

  /**
   * Clean up old records
   */
  async cleanupOldRecords(tableName, dateField, daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const result = await sequelize.query(`
        DELETE FROM ${tableName} 
        WHERE ${dateField} < :cutoffDate
      `, {
        replacements: { cutoffDate },
        type: sequelize.QueryTypes.DELETE
      });

      return { success: true, deletedCount: result[1] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Optimize database (placeholder)
   */
  async optimizeDatabase() {
    try {
      // Run VACUUM and ANALYZE on all tables
      await sequelize.query('VACUUM ANALYZE;');
      return { success: true, message: 'Database optimization completed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Check database health
   */
  async checkHealth() {
    try {
      const health = {
        connection: false,
        tables: {},
        performance: {}
      };

      // Test connection
      const connectionTest = await this.testConnection();
      health.connection = connectionTest.success;

      if (health.connection) {
        // Check table counts
        const { User, Business, Review } = require('../models');
        
        health.tables.users = await User.count();
        health.tables.businesses = await Business.count();
        health.tables.reviews = await Review.count();

        // Check performance metrics
        const slowQueries = await sequelize.query(`
          SELECT query, mean_time, calls 
          FROM pg_stat_statements 
          WHERE mean_time > 1000 
          ORDER BY mean_time DESC 
          LIMIT 5;
        `, { type: sequelize.QueryTypes.SELECT });

        health.performance.slowQueries = slowQueries;
      }

      return { success: true, data: health };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new DatabaseHelper();
