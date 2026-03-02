import { Body, Controller, Get, Post, Delete, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Post()
  create(@Body() body, @Req() req: any) {
    return this.service.create(body, req.user.userId);
  }

  @Get()
  findMyProjects(@Req() req: any) {
    return this.service.findUserProjects(req.user.userId);
  }

  @Patch(':id')
update(@Param('id') id: string, @Body() body) {
  return this.service.update(id, body);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.service.delete(id);
}
}