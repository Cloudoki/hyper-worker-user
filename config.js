exports = module.exports = {
    logger: {
        name: process.env.CLDK_WORKER_USER_LOGGER_NAME || 'CLDK',
        level: process.env.CLDK_WORKER_USER_LOGGER_LEVEL || 'debug'
    },
    database: {
        host: process.env.CLDK_WORKER_USER_DB_HOST || 'localhost',
        database: process.env.CLDK_WORKER_USER_DB_NAME || 'hyper',
        user: process.env.CLDK_WORKER_USER_DB_USER || 'root',
        password: process.env.CLDK_WORKER_USER_DB_PASSWORD || 'localdev',
        pool: {
            min: process.env.CLDK_WORKER_USER_DB_POOL_MIN || 2,
            max: process.env.CLDK_WORKER_USER_DB_POOL_MAX || 10
        }
    },
    queue: {
<<<<<<< HEAD
        uri: process.env.CLDK_WORKER_USER_QUEUE_URI || 'amqps://mq.dev.cloudoki.com',
        reconnect: process.env.CLDK_WORKER_USER_QUEUE_RECONNECT || 5000,
        options: {
            cert: process.env.CLDK_WORKER_USER_QUEUE_CERT || '/Users/tomasfoglio/Cloudoki/donderstarter-api/ssl/client/cert.pem',
            key: process.env.CLDK_WORKER_USER_QUEUE_KEY || '/Users/tomasfoglio/Cloudoki/donderstarter-api/ssl/client/key.pem',
            passphrase: process.env.CLDK_WORKER_USER_QUEUE_CERT_PASS || 'cloudoki',
            ca: process.env.CLDK_WORKER_USER_QUEUE_CA || '/Users/tomasfoglio/Cloudoki/donderstarter-api/ssl/ca/cacert.pem'
=======
        uri: process.env.CLDK_WORKER_QUEUE_URI || 'amqps://mq.dev.cloudoki.com',
        reconnect: process.env.CLDK_WORKER_QUEUE_RECONNECT || 5000,
        options: {
            cert: process.env.CLDK_WORKER_QUEUE_CERT || 'ssl/cert.pem',
            key: process.env.CLDK_WORKER_QUEUE_KEY || 'ssl/key.pem',
            passphrase: process.env.CLDK_WORKER_QUEUE_CERT_PASS || 'cloudoki',
            ca: process.env.CLDK_WORKER_QUEUE_CA || 'ssl/cacert.pem'
>>>>>>> 0814759e7fce422d6138aa6e8df1a721cee4f53a
        }
    }
};
