import { Component, OnInit } from '@angular/core';
import { Task } from './Service/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskDialogResult } from './Service/taskDialogResult';

import { TaskService } from './Service/task.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todo: BehaviorSubject<Task[]>;
  inProgress: BehaviorSubject<Task[]>;
  done: BehaviorSubject<Task[]>;
  
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.todo = this.taskService.getData().todo;
    this.inProgress = this.taskService.getData().inProgress;
    this.done = this.taskService.getData().done; 
    console.log(this.todo); 
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result.delete) {
        this.taskService.deleteData(list, task);
      } else {
        this.taskService.updateData(list, task)
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    
    this.taskService.transactData(event, item);

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
