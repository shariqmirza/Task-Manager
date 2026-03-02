import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Post()
create(@Body() body, @Req() req: any) {
  return this.taskservice.create({
    ...body,
    userId: req.user.userId,
  });
}

  @Get(':projectId')
getTasks(@Param('projectId') projectId: string, @Req() req: any) {
  return this.taskservice.findByProject(projectId, req.user.userId);
}

  @Patch(':id')
update(@Param('id') id: string, @Body() body) {
  return this.taskservice.update(id, body);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.taskservice.remove(id);
}
}