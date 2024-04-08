import { IsArray, IsEmpty } from 'class-validator';

export class CreateInboxDTO {
  @IsArray()
  @IsEmpty()
  participants: [];

  @IsArray()
  @IsEmpty()
  messasges: [];
}
