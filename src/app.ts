/**
 * Philly Telegram Adapter Application
 */
import config from './config/environment';
import logging from './services/logging.service';

const logger = logging.getLogger(__filename);

logger.info('config', config);