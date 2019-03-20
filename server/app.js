import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import messageRoutes from './routes/messages';
import groupRoutes from './routes/groups';
import swaggerDocument from '../swagger.json';
import { createTables } from './data/create_tables';

const app = express();

const port = process.env.PORT || 3500;

app.use(morgan('dev'));

createTables();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes which should handle requests
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/groups', groupRoutes);
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
