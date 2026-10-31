// // // // // const express = require('express');
// // // // // const cors = require('cors');
// // // // // const helmet = require('helmet');
// // // // // const morgan = require('morgan');
// // // // // const cookieParser = require('cookie-parser');
// // // // // const rateLimit = require('express-rate-limit');

// // // // // const env = require('./config/env');
// // // // // const routes = require('./routes');
// // // // // const notFound = require('./middlewares/notFound');
// // // // // const errorHandler = require('./middlewares/errorHandler');

// // // // // const app = express();

// // // // // // Security headers
// // // // // app.use(helmet());

// // // // // // CORS locked to the configured frontend origin, credentials enabled for cookies
// // // // // app.use(
// // // // //     cors({
// // // // //         origin: env.clientOrigin,
// // // // //         credentials: true,
// // // // //     })
// // // // // );

// // // // // // Body & cookie parsing
// // // // // app.use(express.json({ limit: '10kb' }));
// // // // // app.use(express.urlencoded({ extended: true }));
// // // // // app.use(cookieParser());

// // // // // // Request logging (dev only)
// // // // // if (env.nodeEnv !== 'production') {
// // // // //     app.use(morgan('dev'));
// // // // // }

// // // // // // Global rate limiter to slow brute-force / abuse attempts
// // // // // app.use(
// // // // //     rateLimit({
// // // // //         windowMs: 15 * 60 * 1000,
// // // // //         max: 300,
// // // // //         standardHeaders: true,
// // // // //         legacyHeaders: false,
// // // // //     })
// // // // // );

// // // // // // API routes
// // // // // app.use('/api', routes);

// // // // // // 404 + centralized error handling (must be last)
// // // // // app.use(notFound);
// // // // // app.use(errorHandler);

// // // // // module.exports = app;

// // // // const express = require('express');
// // // // const cors = require('cors');
// // // // const helmet = require('helmet');
// // // // const morgan = require('morgan');
// // // // const cookieParser = require('cookie-parser');
// // // // const rateLimit = require('express-rate-limit');

// // // // const env = require('./config/env');
// // // // const routes = require('./routes');
// // // // const cropRoutes = require('./routes/cropRoutes');
// // // // const notFound = require('./middlewares/notFound');
// // // // const errorHandler = require('./middlewares/errorHandler');

// // // // const app = express();

// // // // // Security headers
// // // // app.use(helmet());

// // // // // CORS locked to the configured frontend origin, credentials enabled for cookies
// // // // app.use(
// // // //     cors({
// // // //         origin: env.clientOrigin,
// // // //         credentials: true,
// // // //     })
// // // // );

// // // // // Body & cookie parsing
// // // // app.use(express.json({ limit: '10kb' }));
// // // // app.use(express.urlencoded({ extended: true }));
// // // // app.use(cookieParser());

// // // // // Request logging (dev only)
// // // // if (env.nodeEnv !== 'production') {
// // // //     app.use(morgan('dev'));
// // // // }

// // // // // Global rate limiter to slow brute-force / abuse attempts
// // // // app.use(
// // // //     rateLimit({
// // // //         windowMs: 15 * 60 * 1000,
// // // //         max: 300,
// // // //         standardHeaders: true,
// // // //         legacyHeaders: false,
// // // //     })
// // // // );

// // // // // API routes
// // // // app.use('/api', routes);
// // // // app.use('/api/crop', cropRoutes);
// // // // app.use('/api/yield', yieldRoutes);

// // // // // 404 + centralized error handling (must be last)
// // // // app.use(notFound);
// // // // app.use(errorHandler);

// // // // module.exports = app;

// // // const express = require('express');
// // // const cors = require('cors');
// // // const helmet = require('helmet');
// // // const morgan = require('morgan');
// // // const cookieParser = require('cookie-parser');
// // // const rateLimit = require('express-rate-limit');

// // // const env = require('./config/env');
// // // const routes = require('./routes');
// // // const cropRoutes = require('./routes/cropRoutes');
// // // const yieldRoutes = require('./routes/yieldRoutes');
// // // const notFound = require('./middlewares/notFound');
// // // const errorHandler = require('./middlewares/errorHandler');

// // // const app = express();

// // // // Security headers
// // // app.use(helmet());

// // // // CORS locked to the configured frontend origin, credentials enabled for cookies
// // // app.use(
// // //     cors({
// // //         origin: env.clientOrigin,
// // //         credentials: true,
// // //     })
// // // );

// // // // Body & cookie parsing
// // // app.use(express.json({ limit: '10kb' }));
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(cookieParser());

// // // // Request logging (dev only)
// // // if (env.nodeEnv !== 'production') {
// // //     app.use(morgan('dev'));
// // // }

// // // // Global rate limiter to slow brute-force / abuse attempts
// // // app.use(
// // //     rateLimit({
// // //         windowMs: 15 * 60 * 1000,
// // //         max: 300,
// // //         standardHeaders: true,
// // //         legacyHeaders: false,
// // //     })
// // // );

// // // // API routes
// // // app.use('/api', routes);
// // // app.use('/api/crop', cropRoutes);
// // // app.use('/api/yield', yieldRoutes);

// // // // 404 + centralized error handling (must be last)
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // module.exports = app;

// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const morgan = require('morgan');
// // const cookieParser = require('cookie-parser');
// // const rateLimit = require('express-rate-limit');

// // const env = require('./config/env');
// // const routes = require('./routes');
// // const cropRoutes = require('./routes/cropRoutes');
// // const yieldRoutes = require('./routes/yieldRoutes');
// // const diseaseRoutes = require('./routes/diseaseRoutes');
// // const notFound = require('./middlewares/notFound');
// // const errorHandler = require('./middlewares/errorHandler');

// // const app = express();

// // // Security headers
// // app.use(helmet());

// // // CORS locked to the configured frontend origin, credentials enabled for cookies
// // app.use(
// //     cors({
// //         origin: env.clientOrigin,
// //         credentials: true,
// //     })
// // );

// // // Body & cookie parsing
// // app.use(express.json({ limit: '10kb' }));
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // Request logging (dev only)
// // if (env.nodeEnv !== 'production') {
// //     app.use(morgan('dev'));
// // }

// // // Global rate limiter to slow brute-force / abuse attempts
// // app.use(
// //     rateLimit({
// //         windowMs: 15 * 60 * 1000,
// //         max: 300,
// //         standardHeaders: true,
// //         legacyHeaders: false,
// //     })
// // );

// // // API routes
// // app.use('/api', routes);
// // app.use('/api/crop', cropRoutes);
// // app.use('/api/yield', yieldRoutes);
// // app.use('/api/disease', diseaseRoutes);

// // // 404 + centralized error handling (must be last)
// // app.use(notFound);
// // app.use(errorHandler);

// // module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');

// const env = require('./config/env');
// const routes = require('./routes');
// const cropRoutes = require('./routes/cropRoutes');
// const yieldRoutes = require('./routes/yieldRoutes');
// const diseaseRoutes = require('./routes/diseaseRoutes');
// const fertilizerRoutes = require('./routes/fertilizerRoutes');
// const notFound = require('./middlewares/notFound');
// const errorHandler = require('./middlewares/errorHandler');
// const protect = require('./middlewares/authMiddleware');

// const app = express();

// // Security headers
// app.use(helmet());

// // CORS locked to the configured frontend origin, credentials enabled for cookies
// app.use(
//     cors({
//         origin: env.clientOrigin,
//         credentials: true,
//     })
// );

// // Body & cookie parsing
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Request logging (dev only)
// if (env.nodeEnv !== 'production') {
//     app.use(morgan('dev'));
// }

// // Global rate limiter to slow brute-force / abuse attempts
// app.use(
//     rateLimit({
//         windowMs: 15 * 60 * 1000,
//         max: 300,
//         standardHeaders: true,
//         legacyHeaders: false,
//     })
// );

// // API routes
// app.use('/api', routes);
// app.use('/api/crop', protect, cropRoutes);
// app.use('/api/yield', protect, yieldRoutes);
// app.use('/api/disease', protect, diseaseRoutes);
// app.use('/api/fertilizer', protect, fertilizerRoutes);

// // 404 + centralized error handling (must be last)
// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const routes = require('./routes');
const cropRoutes = require('./routes/cropRoutes');
const yieldRoutes = require('./routes/yieldRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const historyRoutes = require('./routes/historyRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const protect = require('./middlewares/authMiddleware');

const app = express();

// Security headers
app.use(helmet());

// CORS locked to the configured frontend origin, credentials enabled for cookies
app.use(
    cors({
        origin: env.clientOrigin,
        credentials: true,
    })
);

// Body & cookie parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging (dev only)
if (env.nodeEnv !== 'production') {
    app.use(morgan('dev'));
}

// Global rate limiter to slow brute-force / abuse attempts
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

// API routes
app.use('/api', routes);
app.use('/api/crop', protect, cropRoutes);
app.use('/api/yield', protect, yieldRoutes);
app.use('/api/disease', protect, diseaseRoutes);
app.use('/api/fertilizer', protect, fertilizerRoutes);
app.use('/api/history', protect, historyRoutes);

// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
