import * as dot from 'dot';
import * as staticServe from 'koa-static';
import { Context } from 'koa';
import * as path from 'path';

// var favIconHtml = '<link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />' +
//   '<link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />'

// var swaggerInit

// var generateHTML = function (swaggerDoc, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle) {
//   var isExplorer
//   var customJs
//   if (opts && typeof opts === 'object') {
//     isExplorer = opts.explorer
//     options = opts.swaggerOptions
//     customCss = opts.customCss
//     customJs = opts.customJs
//     customfavIcon = opts.customfavIcon
//     swaggerUrl = opts.swaggerUrl
//     customeSiteTitle = opts.customSiteTitle
//   } else {
//     //support legacy params based function
//     isExplorer = opts
//   }
//   options = options || {};
//   var explorerString = isExplorer ? '' : '.swagger-ui .topbar .download-url-wrapper { display: none }';
//   customCss = explorerString + ' ' + customCss || explorerString;
//   customfavIcon = customfavIcon || false;
//   customeSiteTitle = customeSiteTitle || 'Swagger UI';
//   var html = fs.readFileSync(__dirname + '/indexTemplate.html');
//   try {
//     fs.unlinkSync(__dirname + '/index.html');
//   } catch (e) {

//   }

//   var favIconString = customfavIcon ? '<link rel="icon" href="' + customfavIcon + '" />' : favIconHtml;
//   var htmlWithCustomCss = html.toString().replace('<% customCss %>', customCss);
//   var htmlWithFavIcon = htmlWithCustomCss.replace('<% favIconString %>', favIconString);
//   var htmlWithCustomJs = htmlWithFavIcon.replace('<% customJs %>', customJs ? `<script src="${customJs}"></script>` : '');

//   var initOptions = {
//     swaggerDoc: swaggerDoc || undefined,
//     customOptions: options,
//     swaggerUrl: swaggerUrl || undefined
//   }
//   var js = fs.readFileSync(__dirname + '/swagger-ui-init.js');
//   swaggerInit = js.toString().replace('<% swaggerOptions %>', stringify(initOptions))
//   return htmlWithCustomJs.replace('<% title %>', customeSiteTitle)
// }

function setup(swaggerDoc, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle) {
  var htmlWithOptions = generateHTML(swaggerDoc, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle)
  return (ctx: Context, next: () => Promise<void>) { ctx.send(htmlWithOptions); };
};

function swaggerInitFn(ctx: Context, next: () => Promise<any>) {
  if (ctx.url === '/swagger-ui-init.js') {
    ctx.set('Content-Type', 'application/javascript');
    ctx.body = (swaggerInit);
    return;
  }
  return next();
}

// var swaggerInitFunction = function (swaggerDoc, opts) {
//   var js = fs.readFileSync(__dirname + '/swagger-ui-init.js');
//   var swaggerInitFile = js.toString().replace('<% swaggerOptions %>', stringify(opts))
//   return function (req, res, next) {
//     if (req.url === '/swagger-ui-init.js') {
//       res.set('Content-Type', 'application/javascript')
//       res.send(swaggerInitFile)
//     } else {
//       next()
//     }
//   }
// }

const serve = [swaggerInitFn, staticServe(path.join(__dirname, '/static'))];

export {
  setup,
  serve,
};
