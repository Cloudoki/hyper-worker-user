'use strict'

const schema = {
    env: {
        doc: 'The user worker environment.',
        format: ['production', 'staging', 'development'],
        default: 'development',
        env: 'HYPER_WORKER_USER_NODE_ENV'
    },
    database: {
        options:{
            doc: 'Database default options',
            format: Object,
            env: 'HYPER_WORKER_USER_DATABASE_OPTS',
            default: {}
        },
        pool: {
            min: {
                doc: 'minimum number of connection with the database',
                format: Number,
                env: 'HYPER_WORKER_USER_DB_POOL_MIN',
                default: 2
            },
            max: {
                doc: 'maximum number of connection with the database',
                format: Number,
                env: 'HYPER_WORKER_USER_DB_POOL_MAX',
                default: 10
            },
            refreshIdle: {
                doc: 'Specifies whether idle resources at or below the min threshold should be destroyed/re-created',
                format: Boolean,
                env: 'HYPER_WORKER_USER_DB_POOL_REFRESH_IDLE',
                default: false
            }
        }
    },
    seneca: {
        options: {
            doc: 'Seneca default options',
            format: Object,
            env: 'HYPER_WORKER_USER_SENECA_OPTS',
            default: {}
        },
        client: {
            type: {
                doc: 'Seneca CORS origin',
                format: String,
                env: 'HYPER_WORKER_USER_SENECA_CLIENT_TYPE',
                default: 'amqp'
            },
            url: {
                doc: 'Seneca broker connection url',
                format: String,
                env: 'HYPER_WORKER_USER_BROKER_URL'
            },
            name: {
                doc: 'Broker queue name',
                format: String,
                env: 'HYPER_WORKER_USER_BROKER_QUEUE_NAME',
                default: 'hyper.user.queue'
            },
            pins: {
                doc: 'Seneca services pins',
                format: Array,
                env: 'HYPER_WORKER_USER_ENABLED_PINS',
                default: [
                    'role:account',
                    'role:permission',
                    'role:role',
                    'role:user',
                    'role:superadmin',
                    'role:authorization',
                    'role:userWorker',
                    'role:oauthClient',
                    'role:oauthFlow'
                ]
            }
        },
        rabbitOptions: {
            doc: 'Seneca Rabbit connector default options',
            format: Object,
            env: 'HYPER_WORKER_USER_SENECA_RABBIT_CONNECTOR_OPTS',
            default: {}
        }
    },
    logger: {
        name: {
            doc: 'API logger name',
            format: String,
            default: 'Hyper-Worker-User'
        },
        level: {
            doc: 'Logger level',
            format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
            default: 'trace'
        }
    }
};

module.exports = schema;