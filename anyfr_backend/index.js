require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { initModels } = require('./src/models');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const methodNotAllowed = require('./src/middlewares/methodNotAllowed');
const logger = require('./src/utils/logger');
const app = express();
const PORT = 3100;

// Swagger definition
const swaggerOptions = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'Your API description',
      },
  },
  apis: ['./src/routes/*.js'],  
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('trust proxy', 1);

// ✅ Caching Initialized Models to Prevent Re-initialization
const modelCache = {};

/**
 * 🌍 Middleware to Attach Models to `req.models`
 */
// app.use(async (req, res, next) => {
//   try {
//       const subdomain = req.get('host')?.split('.')[0] || 'default';
//       // const subdomain = "demo.json";
//       const runMigration = req.query.migrate === 'true'; // Extract migration flag

//       // ✅ If Migration is Requested, Clear Cache & Re-Run Migration
//       if (runMigration) {
//           logger.info(`Clearing model cache & re-running migrations for subdomain: ${subdomain}`);
//           delete modelCache[subdomain];
//       }

//       // ✅ Use Cached Models if Available
//       if (!runMigration && modelCache[subdomain]) {
//           req.models = modelCache[subdomain]; // ✅ Attach cached models
//          // console.log(`✅ Using cached models for subdomain: ${subdomain}`);
//           return next();
//       }

//       // ✅ Initialize Models
//       const models = await initModels(subdomain, runMigration);

//       if (!models || Object.keys(models).length === 0) {
//           throw new Error(`❌ Model initialization failed for subdomain: ${subdomain}`);
//       }

//       // ✅ Assign to Cache & Request Object
//       modelCache[subdomain] = models;
//       req.models = models; 

//       //console.log(`✅ Models initialized & cached for subdomain: ${subdomain}`);
//       next();
//   } catch (error) {
//       logger.error(`Model initialization failed: ${error.message}`);
      
//       // ✅ Ensure `req.models` is always defined
//       req.models = {};

//       return res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
//   }
// });

app.use(async (req, res, next) => {
  try {
    const subdomain = req.get('host')?.split('.')[0] || 'default';
    // No migration logic here, just load cached models or initialize them

    if (modelCache[subdomain]) {
      req.models = modelCache[subdomain]; // Use cached models
      return next();
    }

    // Initialize models without migration
    const models = await initModels(subdomain, false); // False to skip migration during login

    if (!models || Object.keys(models).length === 0) {
      throw new Error(`❌ Model initialization failed for subdomain: ${subdomain}`);
    }

    modelCache[subdomain] = models; // Cache the models
    req.models = models;

    next();
  } catch (error) {
    logger.error(`Model initialization failed: ${error.message}`);
    req.models = {}; // Ensure models are always defined
    return res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
  }
});


// ✅ Security & Middleware Setup
app.use(cookieParser());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL"); // ✅ Allow embedding
  res.setHeader("Content-Security-Policy", "frame-ancestors *"); // ✅ Allow all origins to use iframe
  next();
});




// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ✅ Enable CORS
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://qaapi.anyibc.com',
  'http://demo.anyibc.com',
  'http://demo.anyfinancials.in',
  'http://anyfinancials.in',
  'http://anyibc.com'
];

// Configure CORS
// const corsOptions = {
//   // origin: (origin, callback) => {
//   //   if (!origin || allowedOrigins.includes(origin)) {
//   //     callback(null, true);
//   //   } else {
//   //     callback(new Error('Not allowed by CORS'));
//   //   }
//   // },
//   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   // allowedHeaders: ['Content-Type', 'Authorization'],
//   // credentials: true,
//   // optionsSuccessStatus: 200

//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//         return callback(null, false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });
// Add headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
      return res.status(200).end();
  }
  
  next();
});




// const corsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };
// app.use(cors(corsOptions));


// ✅ Enable CORS
// const corsOptions = {
//   origin: '*', // or your allowed frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // ✅ Handle preflight requests explicitly
// app.options('*', cors(corsOptions), (req, res) => {
//   res.sendStatus(204);
// });



// const allowedOrigins = ['http://localhost:3001', 'http://anyibc.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204  // Use 204 No Content for preflight success

};

app.use(cors(corsOptions));

// ✅ Load All Routes Dynamically from `/src/routes/`
const routePath = './src/routes';
fs.readdirSync(routePath).forEach((file) => {
  // if (file.endsWith('.js') && file !== 'migrate.js') {
    const routeName = file.replace('.js', '');
    try {
      // if (routeName === 'migrate') {
      //     logger.info(`Deferring Migration Route: /migrate (Handled Separately)`);
      //   return; // Skip for now, add manually later
      // }
      app.use(`/${routeName}`, require(`${routePath}/${file}`));
      logger.info(`Route Loaded: /${routeName}`);
    } catch (error) {
      logger.error(`Error loading route: ${routeName} - ${error.message}`);
    }
  }
// }

);

// ✅ Migration Route (Handled Separately)
// app.use('/migrate', require('./src/routes/migrate'));

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  logger.error(`ERROR: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ✅ Start the Server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
