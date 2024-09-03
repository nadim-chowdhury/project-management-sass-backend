import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './projects/project.module';
import { TaskModule } from './tasks/task.module';
import { WebSocketModule } from './websockets/websocket.module';
import { IntegrationModule } from './integrations/integration.module';
import { NotificationService } from './notifications/notification.service';
import { MeetingModule } from './meeting/meeting.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database: 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production
    }),
    AuthModule,
    // UsersModule,
    ProjectModule,
    TaskModule,
    WebSocketModule,
    IntegrationModule,
    MeetingModule,
    FileModule,
  ],
  controllers: [AppController], // If you have other controllers, add them here
  providers: [AppService, NotificationService], // If you have other providers, add them here
})
export class AppModule {}
