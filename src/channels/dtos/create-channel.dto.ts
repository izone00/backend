import { IsBoolean, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  title: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_private: boolean;
}
