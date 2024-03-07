// src/blog/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const cloudinaryConfig = this.configService.get('cloudinary.config');
    cloudinary.config(cloudinaryConfig);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((result, error) => {
        if (result) {
          resolve(result.url);
        } else {
          reject(error);
        }
      });

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      readableStream.pipe(stream);

      stream.on('finish', () => {
        // Do nothing here since resolve is already called in the upload_stream callback
      });

      stream.on('error', (error) => reject(error));
    });
  }
}
