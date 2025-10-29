import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/all-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT ?? 3000
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.enableCors({ origin: "http://localhost:4001" })
  app.use(helmet());
  app.useGlobalFilters( new HttpExceptionFilter())

  // Swagger sozlamalari
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('User, Auth va Product API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // Bu nom guardlarda ishlatiladi
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Token saqlab qolish
    },
  });

  // upload file 
   app.useStaticAssets( join(process.cwd(), "uploads"),{
    prefix: "/uploads"
   })

  await app.listen(PORT, () => {
    console.log("Root API for App:http://localhost:4001 app");
    console.log("Swagger documanatation:http://localhost:4001/api-docs");
  });
}
bootstrap();
