import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.use(compression());
  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("User API")
    .setDescription("Open API with swagger")
    .setVersion("1.0")
    .addTag("user")
    .addApiKey()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: configService.getOrThrow<string>("GRPC_USER_API"),
      protoPath: configService.getOrThrow<string>("GRPC_USER_API_PROTO_PATH"),
      package: configService.getOrThrow<string>("GRPC_USER_API_PROTO_PACKAGE"),
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  const port = configService.getOrThrow<number>("PORT", 8001);

  await app.listen(port);
}
bootstrap();
