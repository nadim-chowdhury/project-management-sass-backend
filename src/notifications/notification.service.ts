import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '../websockets/websocket.gateway';
import { SlackService } from '../integrations/slack.service';
import { DiscordService } from '../integrations/discord.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly webSocketGateway: WebSocketGateway,
    private readonly slackService: SlackService,
    private readonly discordService: DiscordService,
  ) {}

  async sendNotification(message: string): Promise<void> {
    // Broadcast notification via WebSocket
    this.webSocketGateway.server.emit('notification', message);

    // Send notification to Slack
    await this.slackService.sendNotification(message);

    // Send notification to Discord
    await this.discordService.sendNotification(message);
  }
}
