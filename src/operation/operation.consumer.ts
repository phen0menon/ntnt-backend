import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { OperationService } from './operation.service';

export type FinishOperationjob = {
  operationId: number;
};

@Processor('operation')
export class OperationConsumer {
  constructor(@Inject(OperationService) private operationService: OperationService) {}

  @Process('finishOperation')
  async finishOperation(job: Job<FinishOperationjob>) {
    const { operationId } = job.data;
    await this.operationService.finishOperation({ id: operationId });
  }
}
