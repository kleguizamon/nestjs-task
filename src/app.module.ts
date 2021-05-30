import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
