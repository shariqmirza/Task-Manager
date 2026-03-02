import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema'; 
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
  ) {}

  create(data, userId: string) {
    return this.projectModel.create({ ...data, userId });
  }

  findUserProjects(userId: string) {
    return this.projectModel.find({ userId });
  }

  update(id: string, data) {
  return this.projectModel.findByIdAndUpdate(id, data, { new: true });
}

delete(id: string) {
  return this.projectModel.findByIdAndDelete(id);
}
}