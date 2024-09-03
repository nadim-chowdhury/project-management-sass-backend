import { Module } from '@nestjs/common';
import { NotificationsGateway } from './websocket.gateway';

@Module({
  providers: [NotificationsGateway],
})
export class WebSocketModule {}
