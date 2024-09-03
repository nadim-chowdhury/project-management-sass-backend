import { Injectable } from '@nestjs/common';
import { AwsS3Service } from '../integrations/aws-s3.service';
import { GoogleDriveService } from '../integrations/google-drive.service';

@Injectable()
export class FileService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  // async uploadToAwsS3(
  //   file: Express.Multer.File,
  //   bucketName: string,
  // ): Promise<string> {
  //   return this.awsS3Service.uploadFile(file, bucketName);
  // }

  // async uploadToGoogleDrive(file: Express.Multer.File): Promise<string> {
  //   return this.googleDriveService.uploadFile(file);
  // }
}
