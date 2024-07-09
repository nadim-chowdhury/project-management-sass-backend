import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: 'your_aws_access_key_id',
      secretAccessKey: 'your_aws_secret_access_key',
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read', // or private based on your requirements
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location; // return the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file to AWS S3:', error.message);
      throw error;
    }
  }
}
