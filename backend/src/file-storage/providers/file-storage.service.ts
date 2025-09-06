import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

/** Service to manage file storage */
@Injectable()
export class FileStorageService {
  /** Reference to the Firebase storage bucket */
  private bucket;
  /** Dependency injection of PrismaService and FirebaseService */
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  /** Generate a signed URL for file upload or access */
  async getSignedUrl(
    originalFileName: string,
    folder?: string,
    action: 'read' | 'write' = 'write',
  ): Promise<{ url: string; filePath: string }> {
    const uniqueSuffix = uuidv4();
    const extension = originalFileName.split('.').pop();
    const fileName = `${uniqueSuffix}.${extension}`;

    const filePath = folder ? `${folder}/${fileName}` : fileName;
    const bucket = this.firebaseService.bucket;
    if (!bucket) throw new Error('Firebase bucket not initialized');
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: 'image/jpeg',
    });

    return { url, filePath };
  }

  /** Save image metadata to the database */
  async saveImage(filePath: string, userId?: number, vehicleId?: number) {
    if (userId && !vehicleId) {
      return this.prisma.user.update({
        where: { id: userId },
        data: { photoUrl: filePath },
      });
    }

    if (vehicleId) {
      return this.prisma.vehicle.update({
        where: { id: vehicleId },
        data: { vehicleImage: filePath },
      });
    }

    throw new Error(
      'Invalid request: must specify vehcileId or use authenticated user',
    );
  }
}
