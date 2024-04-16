import { Type } from 'class-transformer';
import { IsArray, IsEmpty } from 'class-validator';
import { CreateMessageDTO } from 'src/messages/dtos/messages.dto';

export class CreateInboxDTO {
  @IsArray()
  @IsEmpty()
  participants: [];

  @IsArray()
  @IsEmpty()
  @Type(() => CreateMessageDTO)
  messages: CreateMessageDTO[];
}
