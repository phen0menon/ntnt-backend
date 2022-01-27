import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionOptions } from './ormconfig';
import { OperationModule } from './operation/operation.module';
import { CommonModule } from './common';

@Module({
  imports: [
    BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
    TypeOrmModule.forRoot(connectionOptions),
    CommonModule,
    OperationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
