import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL NOT NULL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN NOT NULL,
      confirmed BOOLEAN NOT NULL,
      createdOn TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS
    messages(
      id SERIAL NOT NULL PRIMARY KEY,
      subject VARCHAR(255) NOT NULL,
      message VARCHAR(255) NOT NULL,
      senderID INTEGER NOT NULL,
      receiverID INTEGER NOT NULL,
      parentMessageId INTEGER NOT NULL,
      status VARCHAR(255) NOT NULL,
      createdOn TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS
    groups(
      id SERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      createdOn TIMESTAMP,
      updatedOn TIMESTAMP
    )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Tables
 */
const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users, message, groups';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

export {
    createTables, dropTables
};


require('make-runnable');
