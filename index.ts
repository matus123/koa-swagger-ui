import * as fs from 'fs';
import * as path from 'path';
import * as Swagger from 'swagger-ui-dist';

const swaggerPath = Swagger.getAbsoluteFSPath();

interface ISwaggerConfig {
  swaggerOptions?: {
    url?: string;
    urls?: Array<{}>;
  };
}

export function initSwagger(config?: ISwaggerConfig) {
  const indexTemplate = './index.html';

  const indexFile = fs.readFileSync(indexTemplate).toString();

  const finalHtml = indexFile.replace('__customOptions__', JSON.stringify(config || {}));

  fs.writeFileSync(path.join(swaggerPath, 'index.html'), finalHtml);

  return swaggerPath;
}
