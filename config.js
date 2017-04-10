// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: process.env.GHOST_SITE_URL || 'http://my-ghost-blog.com',
        mail: {
            from: process.env.GHOST_MAIL_FROM || 'no-reply@my-ghost-blog.com',
            transport: 'SMTP',
            options: {
                host: process.env.GHOST_SMTP_HOST || 'YOUR-SES-SERVER-NAME',
                port: process.env.GHOST_SMTP_PORT || 465,
                service: 'SES',
                auth: {
                    user: process.env.GHOST_SMTP_USER || 'YOUR-SES-ACCESS-KEY-ID',
                    pass: process.env.GHOST_SMTP_PASS || 'YOUR-SES-SECRET-ACCESS-KEY'
                }
            }
        },
        database: {
            client: 'postgres',
            connection: {
                host: process.env.GHOST_DB_HOST || 'database address',
                user: process.env.GHOST_DB_USER || 'username',
                password: process.env.GHOST_DB_PASSWORD || 'password',
                port: process.env.GHOST_DB_PORT || '5432'
            },
        },
        storage: {
            active: 'ghost-s3',
            'ghost-s3': {
                accessKeyId: process.env.GHOST_AWS_KEY_ID || 'foo',
                secretAccessKey: process.env.GHOST_AWS_SECRET_ACCESS_KEY || 'bar',
                bucket: process.env.GHOST_S3_BUCKET || 'ghostbucket',
                region: process.env.GHOST_S3_REGION || 'us-east-1'
            }
        },
        server: {
            host: process.env.GHOST_SITE_HOST || '0.0.0.0',
            port: process.env.GHOST_SITE_PORT || '2368'
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }
};

module.exports = config;
