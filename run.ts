import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as staticServe from 'koa-static';

import * as Swagg from './index';

const app = new Koa();

app.use(mount('/docs', staticServe(Swagg.initSwagger({ swaggerOptions: { url: 'http://12.1.0.4:9000/api-swagger-specs/Authentication' } }))));

app.listen(4000, () => console.log('listeing on 4000'));
