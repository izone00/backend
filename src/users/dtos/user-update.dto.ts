import { IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  nickname: string;

  @IsString()
  bio: string;
}
