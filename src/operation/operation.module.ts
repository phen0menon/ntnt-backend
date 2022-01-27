import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationConsumer } from './operation.consumer';
import { BullModule } from '@nestjs/bull';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { Operation } from './entities/operation.entity';

@Module({
  imports: [BullModule.registerQueue({ name: 'operation' }), TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService, OperationConsumer],
  exports: [OperationService],
})
export class OperationModule {}
