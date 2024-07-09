import { Module } from '@nestjs/common';
import { GoogleMeetService } from '../integrations/google-meet.service';
import { ZoomService } from '../integrations/zoom.service';
import { MeetingService } from './meeting.service';

@Module({
  providers: [GoogleMeetService, ZoomService, MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
