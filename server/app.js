import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';

import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import messageRoutes from './routes/messages';
import groupRoutes from './routes/groups';
import swaggerDocument from '../swagger.json';
// import {createTables, dropTables} from './data/create_tables';

dotenv.config();


const app = express();

// dropTables();
// createTables();

// CORS
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

const port = process.env.PORT || 8000;

app.use(morgan('dev'));


// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes which should handle requests
app.use('/api/v2/auth', userRoutes);
app.use('/api/v2/messages', messageRoutes);
app.use('/api/v2/groups', groupRoutes);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: (404),
        error: error.message,
    });
});

app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});


export default app;
