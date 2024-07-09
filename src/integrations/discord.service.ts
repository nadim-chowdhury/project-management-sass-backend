import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DiscordService {
  async sendNotification(message: string): Promise<void> {
    const webhookUrl = 'https://discord.com/api/webhooks/your/webhook/url'; // replace with your Discord webhook URL
    try {
      await axios.post(webhookUrl, { content: message });
    } catch (error) {
      console.error('Error sending Discord notification:', error.message);
    }
  }
}
