import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { FirebaseUser } from './types';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(FirebaseAuthGuard)
    @Post('sync')
    async syncUser(@CurrentUser() user: FirebaseUser, @Body() body: SyncUserDto) {
        console.log("Received /users/sync request", { user, body });
        const newUser = await this.userService.upsertUser({
            firebaseUid: user.uid,
            email: user.email,
            role: body.role === 'ADMIN' ? 'ADMIN' : 'GUEST',
        });
        return { user: newUser };
    }
}
