# Swagger UI static

## Usage

<!-- Express setup `app.js`
```javascript
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Koa setup `app.js`
```javascript
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
``` -->

## Requirements

* Node v8 or above

## Testing

npm install
npm test
