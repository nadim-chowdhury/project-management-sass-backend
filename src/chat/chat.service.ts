import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async getAllMessages(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }

  async createMessage(
    messageData: Partial<MessageEntity>,
  ): Promise<MessageEntity> {
    const newMessage = this.messageRepository.create(messageData);
    return this.messageRepository.save(newMessage);
  }
}
