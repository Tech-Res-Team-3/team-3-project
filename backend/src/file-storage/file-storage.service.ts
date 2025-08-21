import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorageService {
  private storage;
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {
    this.storage = this.firebaseService.storage;
  }

  async getSignedUrl(
    originalFileName: string,
    folder?: string,
    action: 'read' | 'write' = 'write',
  ): Promise<{ url: string; filePath: string }> {
    const uniqueSuffix = uuidv4();
    const extension = originalFileName.split('.').pop();
    const fileName = `${uniqueSuffix}.${extension}`;

    const filePath = folder ? `${folder}/${fileName}` : fileName;
    const file = this.storage.file(filePath);

    const [url] = await file.getSignedUrl({
      action,
      expires: Date.now() + 15 * 60 * 1000,
    });

    return { url, filePath };
  }

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
