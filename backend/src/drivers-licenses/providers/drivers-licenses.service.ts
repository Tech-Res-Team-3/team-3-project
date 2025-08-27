import { Injectable } from "@nestjs/common";
import { UsersService } from "src/user/providers/users.service";

@Injectable()
export class DriversLicensesService {
  constructor(
    private usersService: UsersService
  ) {}
}