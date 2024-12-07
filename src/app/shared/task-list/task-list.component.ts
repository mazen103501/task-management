import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task, Status } from '../../core/models/task.model';
import { CdkDragDrop, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = [];
  @Input() listId: string = '';
  @Input() connectedTo: Status[] = [];
  @Input() title: string = '';

  @Output() taskDropped = new EventEmitter<CdkDragDrop<any>>();
  @Output() deleteTask = new EventEmitter<string>();

  onDrop(event: CdkDragDrop<any>) {
    this.taskDropped.emit(event);
  }

  onDeleteTask(taskId: string) {
    this.deleteTask.emit(taskId);
  }

  onDragStarted() {
    const dropLists = document.querySelectorAll('.table');
    dropLists.forEach((dropList) => {
      dropList.classList.add('drag-active');
    });
    document.body.classList.add('dragging');
  }

  onDragEnded() {
    const dropLists = document.querySelectorAll('.table');
    dropLists.forEach((dropList) => {
      dropList.classList.remove('drag-active');
    });
    document.body.classList.remove('dragging');
  }
}
