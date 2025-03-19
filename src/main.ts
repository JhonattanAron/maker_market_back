import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Variables } from './schema/Variables';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: ['http://localhost:3000'], // Dominios permitidos
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
      credentials: true,
    }, // Permitir cookies y credenciales
  );
  await app.listen(Variables.port);
  log(`Server running on http://localhost:${Variables.port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
