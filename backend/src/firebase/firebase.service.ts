import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          privateKey: this.configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        } as Partial<admin.ServiceAccount>),
        storageBucket: this.configService.get<string>('FIREBASE_BUCKET_URL'),
      });
    }
  }
  get auth() {
    return admin.auth();
  }

  get storage() {
    return admin.storage().bucket();
  }
}
