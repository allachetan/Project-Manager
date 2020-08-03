import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() blockId;

  thisWeekList = [
  ];

  nextWeekList = [
  ];

  completedList = [
  ];

  disableCdkDrag = false;

  ngOnInit() {
    this.loadTasks();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    for (let i = 0; i < this.thisWeekList.length; i++) {
      this.updateTaskLocation(this.thisWeekList[i], 0, i);
    }
    for (let i = 0; i < this.nextWeekList.length; i++) {
      this.updateTaskLocation(this.nextWeekList[i], 1, i);
    }
    for (let i = 0; i < this.completedList.length; i++) {
      this.updateTaskLocation(this.completedList[i], 2, i);
    }
  }

  updateTaskLocation(taskId: number, taskListId: number, taskIndex: number) {
    this.http.get('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/get/'
      + taskId).toPromise().then(data => {
        const postData = {
          // tslint:disable-next-line: object-literal-shorthand
          taskId: taskId,
          blockId: this.blockId,
          // tslint:disable-next-line: object-literal-shorthand
          taskListId: taskListId,
          // tslint:disable-next-line: object-literal-shorthand
          taskIndex: taskIndex,
          // tslint:disable-next-line: no-string-literal
          taskName: data['taskName'],
          // tslint:disable-next-line: no-string-literal
          statusId: data['statusId'],
          // tslint:disable-next-line: no-string-literal
          displayDate: data['displayDate'],
          // tslint:disable-next-line: no-string-literal
          priorityId: data['priorityId']
        };
        this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/mod', postData).subscribe();
      });
  }


  addToThisWeek() {
    const postData = {
      blockId: this.blockId,
      taskListId: 0,
      taskIndex: this.thisWeekList.length,
      taskName: 'New Task',
      statusId: 1,
      displayDate: 'Apr 12',
      priorityId: 0
    };
    this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/mod'
      , postData).toPromise().then(data => {
        // tslint:disable-next-line: no-string-literal
        this.thisWeekList.push(data['taskId']);
      });
  }

  addToNextWeek() {
    const postData = {
      blockId: this.blockId,
      taskListId: 1,
      taskIndex: this.nextWeekList.length,
      taskName: 'New Task',
      statusId: 1,
      displayDate: 'Apr 12',
      priorityId: 0
    };
    this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/mod'
      , postData).toPromise().then(data => {
        // tslint:disable-next-line: no-string-literal
        this.nextWeekList.push(data['taskId']);
      });
  }

  addToCompleted() {
    const postData = {
      blockId: this.blockId,
      taskListId: 2,
      taskIndex: this.completedList.length,
      taskName: 'New Task',
      statusId: 1,
      displayDate: 'Apr 12',
      priorityId: 0
    };
    this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/mod'
      , postData).toPromise().then(data => {
        // tslint:disable-next-line: no-string-literal
        this.completedList.push(data['taskId']);
      });
  }

  loadTasks() {
    this.http.get('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/task/getall/'
      + this.blockId).toPromise().then((data: any[]) => {
        for (const task of data) {
          // tslint:disable-next-line: no-string-literal
          if (task['taskListId'] === 0) {
            // tslint:disable-next-line: no-string-literal
            this.thisWeekList[task['taskIndex']] = task['taskId'];
            // tslint:disable-next-line: no-string-literal
          } else if (task['taskListId'] === 1) {
            // tslint:disable-next-line: no-string-literal
            this.nextWeekList[task['taskIndex']] = task['taskId'];
            // tslint:disable-next-line: no-string-literal
          } else if (task['taskListId'] === 2) {
            // tslint:disable-next-line: no-string-literal
            this.completedList[task['taskIndex']] = task['taskId'];
          }
        }
      });
  }

}
