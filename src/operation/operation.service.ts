import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Queue } from 'bull';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Operation, OperationStatus } from './entities/operation.entity';
import { UtilService } from 'src/common';

export const OPERATION_FINISH_DELAY = 1000 * 5;

@Injectable()
export class OperationService {
  constructor(
    @Inject(UtilService) private readonly util: UtilService,
    @InjectQueue('operation') private readonly queue: Queue,
    @InjectRepository(Operation) private readonly repository: Repository<Operation>,
  ) {}

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const operation = this.repository.create(createOperationDto);
    const instance = await this.repository.save(operation);
    await this.createFinishOperationJob({ operationId: instance.id });
    return instance;
  }

  findAll(): Promise<Operation[]> {
    return this.repository.find();
  }

  finishOperation(payload: { id: number }): Promise<UpdateResult> {
    return this.repository.update(+payload.id, {
      status: this.util.getRandomElement([OperationStatus.DONE, OperationStatus.FAILED]),
    });
  }

  createFinishOperationJob(payload: { operationId: number }) {
    return this.queue.add('finishOperation', payload, { delay: OPERATION_FINISH_DELAY, removeOnComplete: true });
  }
}
