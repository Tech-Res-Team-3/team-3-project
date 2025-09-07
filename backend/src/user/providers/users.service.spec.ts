import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SyncUserDto } from '../dto/sync-user.dto';

describe('UsersService', () => { 
  let service = UsersService;

  beforeEach(async () => {
    const mockUpsertUser: PrismaService = {
      syncUser: (syncUserdto: SyncUserDto) => Promise.resolve({
        role: syncUserdto.role
      }),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers:[
        UsersService,
        { provide: PrismaService, useValue: {} }
      ],

    }).compile();

    service = module.get(UsersService);
  });

  it('Should be defined', () => {});
    expect(service).toBeDefined();
});
