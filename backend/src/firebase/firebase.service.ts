import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

/** Service to manage Firebase integration */
@Injectable()
export class FirebaseService implements OnModuleInit {
  /** Firebase authentication instance */
  public auth: admin.auth.Auth;
  /** Firebase storage bucket instance */
  public bucket: Bucket;
  /** Dependency injection of ConfigService */
  constructor(private readonly configService: ConfigService) {}

  /** Initialize Firebase app and services on module init */
  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          privateKey: this.configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        }),
        storageBucket: this.configService.get<string>('FIREBASE_BUCKET_URL'),
      });
    }

    this.auth = admin.auth();
    this.bucket = admin
      .storage()
      .bucket(this.configService.get<string>('FIREBASE_BUCKET_URL'));
  }

  async setUserRole(uid: string, role: string) {
    await this.auth.setCustomUserClaims(uid, { role });
  }
}
