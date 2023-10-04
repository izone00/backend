import { IsBoolean } from 'class-validator';

export class CreateChannelRelDto {
  @IsBoolean()
  is_owner: boolean;

  @IsBoolean()
  is_admin: boolean;

  @IsBoolean()
  is_banned: boolean;
}
