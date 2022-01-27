import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { OperationService } from './operation.service';

@Processor('operation')
export class OperationConsumer {
  constructor(@Inject(OperationService) private operationService: OperationService) {}

  @Process('finishOperation')
  async finishOperation(job: Job<{ operationId: number }>) {
    this.operationService.finishOperation({ id: job.data.operationId });
  }
}
