import { Injectable, BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';



@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  create(data) {
    return this.taskModel.create(data);
  }

  async findByProject(projectId: string, userId: string) {
  return this.taskModel.find({ projectId, userId });
}   

  async updateStatus(id: string, status: string) {

  const allowed = ['todo','inprogress','done'];

  if (!allowed.includes(status)) {
    throw new BadRequestException('Invalid task status');
  }

  return this.taskModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
}
async update(id: string, data: any) {
  return this.taskModel.findByIdAndUpdate(
    id,
    data,
    { returnDocument: 'after' },
  );
}

  
  remove(id: string) {
  return this.taskModel.findByIdAndDelete(id);
}
}