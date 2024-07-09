import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleMeetService {
  async createMeeting(
    title: string,
    startTime: Date,
    endTime: Date,
    attendees: string[],
  ): Promise<any> {
    // Implement Google Meet API request here
    const accessToken = 'your_google_access_token'; // replace with your Google access token
    const apiUrl =
      'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    const requestBody = {
      summary: title,
      start: { dateTime: startTime.toISOString(), timeZone: 'UTC' },
      end: { dateTime: endTime.toISOString(), timeZone: 'UTC' },
      attendees: attendees.map((email) => ({ email })),
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Google Meet meeting:', error.message);
      throw error;
    }
  }
}
