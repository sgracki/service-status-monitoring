const logger = require('consola');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { redis } = require('./utils');
const Services = require('./lib/services');

redis.init();

const app = express();

// {
//     "website": "http://localhost:3005",
//     "title": "Wandlee dev env",
//     "interval": 1,
//     "httpOptions": {
//         "path": "/ping",
//         "method": "get"
//     },
//     "expect": {
//         "statusCode": 200
//     }
// }

const allowedOrigins = ['https://status.wandlee.com', 'http://localhost:3005'];

app.use('/', express.static('static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    },
}));

app.use('/api', require('./api'));

app.get('/status', async (req, res) => {
    const status = await redis.get('status', {});

    res.json(status);
});

app.post('/restart', async (req, res) => {
    Services.restart();
    res.send('Restarting...');
});

app.listen(3015, async () => {
    logger.success('Service status app on port 3015');

    redis.delete('status');
    redis.delete('services');

    Services.restart();
});
