import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import {
  GetSignedUrlDto,
  SaveImageDto,
  SaveImageResponseDto,
  SignedUrlResponseDto,
} from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { CurrentUser } from 'src/user/decorators';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

/** Controller to manage file storage-related endpoints */
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@Controller('file-storage')
@ApiTags('File Storages')
export class FileStorageController {
  /** Dependency injection of FileStorageService */
  constructor(private readonly fileStorageService: FileStorageService) {}

  /** Endpoint to get a signed URL for file access */
  @ApiOperation({
    summary:
      'Generates a signed URL for uploading a file to Firebase Storage (requires Firebase Auth)',
    description:
      'Returns a signed URL that can be used to uplad a file directly to Firebase Storage. The URL expires in 15 minutes.',
  })
  @ApiOkResponse({
    type: SignedUrlResponseDto,
    description: 'Successfully generated signed url',
  })
  @Post('signed-url')
  async getSignedUrl(@Body() body: GetSignedUrlDto) {
    return this.fileStorageService.getSignedUrl(body.path, body.folder);
  }

  /** Endpoint to save image metadata */
  @ApiOperation({
    summary:
      'Save an uploaded image for a user or a vehicle (requires Firebase Auth)',
  })
  @ApiOkResponse({
    type: SaveImageResponseDto,
    description: 'Successfully saved image',
  })
  @Post('save-image')
  async saveImage(@CurrentUser() user: any, @Body() body: SaveImageDto) {
    return this.fileStorageService.saveImage(
      body.filePath,
      user.id,
      body.vehicleId,
    );
  }
}
