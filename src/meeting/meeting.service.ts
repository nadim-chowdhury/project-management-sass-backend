import { Injectable } from '@nestjs/common';
import { GoogleMeetService } from '../integrations/google-meet.service';
import { ZoomService } from '../integrations/zoom.service';

@Injectable()
export class MeetingService {
  constructor(
    private readonly googleMeetService: GoogleMeetService,
    private readonly zoomService: ZoomService,
  ) {}

  async createGoogleMeet(
    title: string,
    startTime: Date,
    endTime: Date,
    attendees: string[],
  ): Promise<any> {
    return this.googleMeetService.createMeeting(
      title,
      startTime,
      endTime,
      attendees,
    );
  }

  async createZoomMeeting(
    topic: string,
    startTime: Date,
    duration: number,
  ): Promise<any> {
    return this.zoomService.createMeeting(topic, startTime, duration);
  }
}
