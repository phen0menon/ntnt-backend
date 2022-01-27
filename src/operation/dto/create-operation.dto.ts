import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class FinishOperationDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
