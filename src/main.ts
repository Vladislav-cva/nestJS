import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors"


//listen port localhost:3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
  const corsOptions = {
    "origin": "*",
    "headers": "Content-Type, Origin, Accept, X-Requested-With",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  };

  app.enableCors()
  app.use(cors(corsOptions))
}
bootstrap();
