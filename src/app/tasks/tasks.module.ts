// src/app/tasks/tasks.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskBoardComponent } from './pages/task-board/task-board.component';

import { tasksReducer } from './state/tasks.reducer';

import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

@NgModule({
  declarations: [TaskBoardComponent, TaskFormComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', tasksReducer),
  ],
})
export class TasksModule {}
