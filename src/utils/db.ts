import {Sequelize} from 'sequelize-typescript';
import path from 'path';
import {DATA_DIR} from '../services/config.js';
import {Cache, Settings, Shortcut} from '../models/index.js';

const options = {
  models: [Cache, Settings, Shortcut],
  logging: false,
};

let sequelize: Sequelize;
if (process.env.MARIADB === 'true') {
  if (!process.env.MARIADB_USER || !process.env.MARIADB_PASS || !process.env.MARIADB_HOST || !process.env.MARIADB_DB) {
    throw new Error('MARIADB_USER, MARIADB_PASS, MARIADB_HOST and MARIADB_DB required');
  }

  sequelize = new Sequelize({
    ...options,
    dialect: 'mariadb',
    database: process.env.MARIADB_DB,
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASS,
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT ? parseInt(process.env.MARIADB_PORT, 10) : undefined,
  });
} else {
  sequelize = new Sequelize({
    ...options,
    dialect: 'sqlite',
    database: 'muse',
    storage: path.join(DATA_DIR, 'db.sqlite'),
  });
}

export {sequelize};
