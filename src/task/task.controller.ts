import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiParam,
  ApiOkResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import {
  PostTaskRequestBody,
  GetTaskSuccessResponse,
  PostTaskSuccessResponse,
  DeleteTaskSuccessResponse,
} from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiOperation({
    description: 'get all tasks',
  })
  @ApiOkResponse({ type: GetTaskSuccessResponse })
  @Get()
  async getTask(): Promise<GetTaskSuccessResponse> {
    return {
      status: 200,
      data: await this.taskService.getTask(),
    };
  }

  @ApiOkResponse({ type: PostTaskSuccessResponse })
  @ApiBody({ type: PostTaskRequestBody })
  @Post()
  async createTask(
    @Body() taskDto: PostTaskRequestBody,
  ): Promise<PostTaskSuccessResponse> {
    const result = await this.taskService.createTask(taskDto);
    return {
      status: 200,
      data: result,
    };
  }

  @ApiOperation({
    description: 'update a task',
  })
  @ApiOkResponse({ type: PostTaskSuccessResponse })
  @ApiBody({ type: PostTaskRequestBody })
  @ApiParam({ name: 'id' })
  @Put('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id,
    @Body() taskDto: PostTaskRequestBody,
  ): Promise<PostTaskSuccessResponse> {
    const result = await this.taskService.updateTask({ ...taskDto, id });
    return {
      status: 200,
      data: result,
    };
  }

  @ApiOperation({
    description: 'delete a task',
  })
  @ApiOkResponse({ type: DeleteTaskSuccessResponse })
  @ApiParam({ name: 'id' })
  @Delete('/:id')
  async removeTask(
    @Param('id', ParseIntPipe) id,
  ): Promise<DeleteTaskSuccessResponse> {
    return {
      status: 200,
      data: true,
    };
  }
}
