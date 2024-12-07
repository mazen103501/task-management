import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    TaskListComponent,
    ValidationMessageComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    DragDropModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [HeaderComponent, TaskListComponent, ValidationMessageComponent],
})
export class SharedModule {}
