import { IsUUID } from "class-validator";

export class UserRelDto {
  @IsUUID()
  userId
}