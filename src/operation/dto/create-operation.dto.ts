import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
