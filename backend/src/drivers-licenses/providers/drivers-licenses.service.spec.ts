import { Test, TestingModule } from '@nestjs/testing';
import { DriversLicensesService } from './drivers-licenses.service';

describe('DriversLicenseService', () => {
  let service: DriversLicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriversLicensesService],
    }).compile();

    service = module.get<DriversLicensesService>(DriversLicensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
