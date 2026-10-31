const app = require('./src/app');
const env = require('./src/config/env');
const connectDB = require('./src/config/db');

const startServer = async () => {
    await connectDB();

    const server = app.listen(env.port, () => {
        // eslint-disable-next-line no-console
        console.log(`AgriVision API running in ${env.nodeEnv} mode on port ${env.port}`);
    });

    // Graceful shutdown & unhandled rejection safety net
    process.on('unhandledRejection', (err) => {
        // eslint-disable-next-line no-console
        console.error(`Unhandled Rejection: ${err.message}`);
        server.close(() => process.exit(1));
    });
};

startServer();
