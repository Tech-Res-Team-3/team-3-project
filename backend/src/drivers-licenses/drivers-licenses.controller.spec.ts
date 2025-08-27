import { Test, TestingModule } from '@nestjs/testing';
import { DriversLicensesController } from './drivers-licenses.controller';

describe('DriversLicensesController', () => {
  let controller: DriversLicensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversLicensesController],
    }).compile();

    controller = module.get<DriversLicensesController>(DriversLicensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
