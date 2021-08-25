import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import '@tsed/typeorm';
import 'reflect-metadata';
import { config, rootDir } from './config';

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    '/': [
      `${rootDir}/controllers/**/*.ts`,
    ],
  },
  swagger: [
    {
      path: '/v1/docs',
      specVersion: '2.0',
    },
  ],
  exclude: [
    '**/*.spec.ts',
  ],
  statics: {
    '/static': [
      {
        root: `${rootDir}/resources`,
        // ... statics options
      },
    ],
  },
  socketIO: {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  },
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true,
      }));
  }
}
