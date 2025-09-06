import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FileStorageService } from './providers/file-storage.service';
import { GetSignedUrlDto, SaveImageDto } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { CurrentUser } from 'src/user/decorators';
import { ApiTags } from '@nestjs/swagger';

/** Controller to manage file storage-related endpoints */
@Controller('file-storage')
@ApiTags('File Storages')
export class FileStorageController {
  /** Dependency injection of FileStorageService */
  constructor(private readonly fileStorageService: FileStorageService) {}

  /** Endpoint to get a signed URL for file access */
  @UseGuards(FirebaseAuthGuard)
  @Post('signed-url')
  async getSignedUrl(@Body() body: GetSignedUrlDto) {
    return this.fileStorageService.getSignedUrl(body.path, body.folder);
  }

  /** Endpoint to save image metadata */
  @UseGuards(FirebaseAuthGuard)
  @Post('save-image')
  async saveImage(@CurrentUser() user: any, @Body() body: SaveImageDto) {
    return this.fileStorageService.saveImage(
      body.filePath,
      user.id,
      body.vehicleId,
    );
  }
}
