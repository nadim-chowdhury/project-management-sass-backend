import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZoomService {
  async createMeeting(
    topic: string,
    startTime: Date,
    duration: number,
  ): Promise<any> {
    // Implement Zoom API request here
    const apiUrl = 'https://api.zoom.us/v2/users/me/meetings';
    const apiKey = 'your_zoom_api_key';
    const apiSecret = 'your_zoom_api_secret';

    const requestBody = {
      topic,
      type: 2, // Scheduled meeting
      start_time: startTime.toISOString(),
      duration,
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${this.generateJwt(apiKey, apiSecret)}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Zoom meeting:', error.message);
      throw error;
    }
  }

  private generateJwt(apiKey: string, apiSecret: string): string {
    const payload = {
      iss: apiKey,
      exp: new Date().getTime() + 5000,
    };

    const token = jwt.sign(payload, apiSecret);
    return token;
  }
}
