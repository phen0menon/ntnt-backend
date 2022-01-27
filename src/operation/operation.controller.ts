import { Controller, Get, Post, Body } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  create(@Body() operationData: CreateOperationDto) {
    return this.operationService.create(operationData);
  }

  @Get()
  findAll() {
    return this.operationService.findAll();
  }
}
