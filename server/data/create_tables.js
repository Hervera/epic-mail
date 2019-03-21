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
const createTables = () => new Promise(async (resolve, reject) => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL NOT NULL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
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
      senderID INTEGER REFERENCES users(id) ON DELETE CASCADE,
      receiverID INTEGER REFERENCES users(id) ON DELETE CASCADE,
      parentMessageId INTEGER NOT NULL,
      status VARCHAR(255) NOT NULL,
      createdOn TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS
    groups(
      id SERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
      createdOn TIMESTAMP,
      updatedOn TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS
    group_members(
        id SERIAL PRIMARY KEY,
        groupId INTEGER REFERENCES groups(id) ON DELETE CASCADE,
        memberId INTEGER REFERENCES users(id) ON DELETE CASCADE,
        userRole VARCHAR(255) NOT NULL,
        createdOn TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS
    group_messages(
        id SERIAL PRIMARY KEY,
        subject VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        senderID INTEGER REFERENCES users(id) ON DELETE CASCADE,
        groupId INTEGER REFERENCES groups(id) ON DELETE CASCADE,
        parentMessageId INTEGER NOT NULL,
        status VARCHAR(10) NOT NULL,
        createdOn TIMESTAMP
    );`;

    try {
        await pool.query(queryText);
        resolve();
    } catch (error) {
        reject(error);
    }
});

/**
 * Drop Tables
 */
const dropTables = () => new Promise(async (resolve, reject) => {
    const queryText = `DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS messages CASCADE;
    DROP TABLE IF EXISTS groups CASCADE;
    DROP TABLE IF EXISTS group_members CASCADE;
    DROP TABLE IF EXISTS group_messages CASCADE;
    `;

    try {
        await pool.query(queryText);
        resolve();
    } catch (error) {
        reject(error);
    }
});

export {
    createTables, dropTables
};


require('make-runnable');
