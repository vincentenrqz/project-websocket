import { IsDate, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  sender: string;

  @IsString()
  content: string;

  @IsDate()
  timestamp: Date;
}
