import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { MessageEntity } from './message.entity';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
