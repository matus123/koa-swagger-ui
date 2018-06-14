import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

import * as swaggerUI from '../../index';

const app = new Koa();
const router = new KoaRouter();
// var swaggerDocument = require('./swagger.json');

// var swaggerDocumentSplit = require('./swagger-split.json');

// app.use((req, res, next) => {
//   if (req.url === '/favicon.ico') {
//     res.sendFile(__dirname + '/favicon.ico');
//   } else if (req.url === '/swagger.json') {
//     res.sendFile(__dirname + '/swagger.json');
//   } else {
//     next();
//   }
// });

// const options = {
//   validatorUrl: null,
//   oauth: {
//     clientId: 'your-client-id1',
//     clientSecret: 'your-client-secret-if-required1',
//     realm: 'your-realms1',
//     appName: 'your-app-name1',
//     scopeSeparator: ',',
//     additionalQueryStringParams: {}
//   },
//   docExpansion: 'full',
//   operationsSorter(a, b) {
//     const score = {
//       '/test': 1,
//       '/bar': 2,
//     };
//     console.log('a', a.get('path'), b.get('path'));
//     return score[a.get('path')] < score[b.get('path')];
//   },
// };

router.post('/test', (ctx) => {
  ctx.status = 200;
  ctx.body = { status: 'OK' };
});
router.get('/bar', function(req, res) { res.json({ status: 'OKISH' }); });

router.use('/api-docs', swaggerUI.serve);
router.get(
  '/api-docs',
  swaggerUI.setup(swaggerDocument, false, options, '.swagger-ui .topbar { background-color: red }')
);

router.use('/api-docs-from-url', swaggerUI.serve);
router.get('/api-docs-from-url', swaggerUI.setup(null, false, options, '.swagger-ui .topbar { background-color: red }', null, '/swagger.json'));

const swaggerUiOpts = {
  explorer: false,
  swaggerOptions: options,
  customCss: '.swagger-ui .topbar { background-color: blue }',
};

router.use('/api-docs-using-object', swaggerUI.serve);
router.get('/api-docs-using-object', swaggerUI.setup(swaggerDocument, swaggerUiOpts));

const swaggerUiOpts2 = {
  explorer: false,
  swaggerOptions: options,
  customCss: '.swagger-ui .topbar { background-color: pink }',
  swaggerUrl: '/swagger.json',
  customJs: '/my-custom.js',
  operationsSorter: 'alpha',
};

router.use('/api-docs-from-url-using-object', swaggerUI.serve);
router.get('/api-docs-from-url-using-object', swaggerUI.setup(null, swaggerUiOpts2));

router.use('/api-docs-with-null', swaggerUI.serve);
router.get('/api-docs-with-null', swaggerUI.setup(swaggerDocument, null, options, '.swagger-ui .topbar { background-color: orange }'));

router.use('/api-docs-split', swaggerUI.serve);
router.get('/api-docs-split', swaggerUI.setup(swaggerDocumentSplit, null, options, '.swagger-ui .topbar { background-color: orange }'));

router.use('/api-docs-with-opts/', swaggerUI.serveWithOptions({ redirect: false }));
router.get('/api-docs-with-opts/', swaggerUI.setup(swaggerDocumentSplit, null, options, '.swagger-ui .topbar { background-color: orange }'));

const swaggerHtml = swaggerUI.generateHTML(swaggerDocument, swaggerUiOpts);

router.use('/api-docs-html1', swaggerUI.serveFiles(swaggerDocument, swaggerUiOpts));
router.get('/api-docs-html1', (req, res) => { res.send(swaggerHtml); });

router.use((ctx) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

export {
  app,
};
