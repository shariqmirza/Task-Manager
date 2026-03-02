import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TaskStatus = 'todo' | 'inprogress' | 'done';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'todo' })
  status: TaskStatus;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);