import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageEntity } from './message.entity';

@WebSocketGateway()
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: Partial<MessageEntity>,
  ): Promise<void> {
    const newMessage = await this.chatService.createMessage(message);
    this.server.emit('newMessage', newMessage);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(): Promise<MessageEntity[]> {
    return this.chatService.getAllMessages();
  }
}
