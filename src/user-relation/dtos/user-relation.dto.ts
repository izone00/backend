import { IsNumber } from 'class-validator';

export class UserRelDto {
  @IsNumber()
  userId;
}
