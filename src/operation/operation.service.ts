import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { UtilService } from 'src/common';
import { OperationSocketGateway } from 'src/common/gateways';
import { OperationSocketEvents } from 'src/common/gateways/operation.gateway';
import { OPERATION_FINISH_DELAY } from 'src/common/constants';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Operation, OperationStatus } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(
    @Inject(UtilService) private readonly util: UtilService,
    @InjectQueue('operation') private readonly queue: Queue,
    @InjectRepository(Operation) private readonly repository: Repository<Operation>,
    @Inject(OperationSocketGateway) private readonly gateway: OperationSocketGateway,
  ) {}

  async create(createOperationDto: CreateOperationDto) {
    const operation = this.repository.create(createOperationDto);
    const instance = await this.repository.save(operation);
    await this.createFinishOperationJob({ operationId: instance.id });
    return instance;
  }

  findAll(): Promise<Operation[]> {
    return this.repository.find();
  }

  async finishOperation(payload: { id: number }) {
    const status = this.util.getRandomElement([OperationStatus.DONE, OperationStatus.FAILED]);
    await this.repository.update(+payload.id, {
      status,
    });
    this.notifyFinishOperation({ id: payload.id, status });
  }

  async notifyFinishOperation(payload: { id: number; status: number }) {
    this.gateway.server.emit(OperationSocketEvents.OperationChangeStatus, payload);
  }

  createFinishOperationJob(payload: { operationId: number }) {
    return this.queue.add('finishOperation', payload, { delay: OPERATION_FINISH_DELAY, removeOnComplete: true });
  }
}
