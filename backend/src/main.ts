import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [ 
      "http://localhost:3000",
      "https://task-manager-six-ivory.vercel.app",

    ],
  credentials: true,
  });
  app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
