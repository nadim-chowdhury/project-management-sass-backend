import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Multer } from 'multer';

@Injectable()
export class GoogleDriveService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Implement Google Drive API request here
    const accessToken = 'your_google_drive_access_token'; // replace with your Google Drive access token
    const apiUrl =
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    const formData = new FormData();
    // formData.append('file', file.buffer, { filename: file.originalname });

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.webViewLink; // return the web view link of the uploaded file
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error.message);
      throw error;
    }
  }
}
