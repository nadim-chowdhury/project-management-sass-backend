import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { DiscordService } from './discord.service';

@Module({
  providers: [SlackService, DiscordService],
  exports: [SlackService, DiscordService],
})
export class IntegrationModule {}

// import { Module } from '@nestjs/common';
// import { GoogleMeetService } from './google-meet.service';
// import { ZoomService } from './zoom.service';
// import { AwsS3Service } from './aws-s3.service';
// import { GoogleDriveService } from './google-drive.service';

// @Module({
//   providers: [GoogleMeetService, ZoomService, AwsS3Service, GoogleDriveService],
//   exports: [GoogleMeetService, ZoomService, AwsS3Service, GoogleDriveService],
// })
// export class IntegrationModule {}