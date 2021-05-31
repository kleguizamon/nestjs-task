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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
    @GetUser()
    user: User,
  ): Promise<Task[]> {
    return this.tasksServices.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksServices.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser()
    user: User,
  ): Promise<void> {
    return this.tasksServices.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksServices.updateTaskStatus(id, status, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    //@GetUser custom decorator
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto, user);
  }
}
