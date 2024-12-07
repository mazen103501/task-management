import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardComponent } from './pages/task-board/task-board.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

const routes: Routes = [
  { path: '', component: TaskBoardComponent },
  { path: 'add', component: TaskFormComponent },
  { path: ':id/edit', component: TaskFormComponent },
  { path: ':id', component: TaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
