import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  //ValidationPipe in query
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksServices.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksServices.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksServices.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksServices.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto);
  }
}
