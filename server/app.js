import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user';
import bodyParser from 'body-parser';

const app = express();

app.use(morgan('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes which should handle requests
app.use('/auth', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: (404),
        error: error.message
    });
});

const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log(`Server running at port ${port}...`);
});
