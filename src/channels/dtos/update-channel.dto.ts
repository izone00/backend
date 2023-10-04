import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChannelDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_private: boolean;

  // @IsOptional()
  // @IsNumber()
  // owner: number;
}
