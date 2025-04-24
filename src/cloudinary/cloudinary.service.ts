/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Use the file buffer instead of file.path
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: 'job_management' },
        (error, result) => {
          if (error) {
            reject(error);
          }
          if (result?.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Failed to upload image'));
          }
        },
      );

      // Pass the buffer to the upload stream
      uploadStream.end(file.buffer);
    });
  }
}
