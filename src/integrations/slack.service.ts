import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SlackService {
  async sendNotification(message: string): Promise<void> {
    const webhookUrl = 'https://hooks.slack.com/services/your/webhook/url'; // replace with your Slack webhook URL
    try {
      await axios.post(webhookUrl, { text: message });
    } catch (error) {
      console.error('Error sending Slack notification:', error.message);
    }
  }
}
