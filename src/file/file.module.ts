import { Module } from '@nestjs/common';
import { AwsS3Service } from '../integrations/aws-s3.service';
import { GoogleDriveService } from '../integrations/google-drive.service';
import { FileService } from './file.service';

@Module({
  providers: [AwsS3Service, GoogleDriveService, FileService],
  exports: [FileService],
})
export class FileModule {}
