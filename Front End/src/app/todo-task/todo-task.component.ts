import { Component, OnInit, Input } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoTaskService } from './todo-task.service';




@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  providers: [TodoTaskService]
})
export class TodoTaskComponent implements OnInit {

  constructor(public todoTaskService: TodoTaskService) { }

  @Input() taskId: number;
  @Input() todoListComponent: TodoListComponent;

  @Input() taskName = 'New Task';

  // status drop down properties
  statusDropDownZIndex = -10;
  statusDropDownOpacity = 0;

  // prioirty drop down properties
  priorityDropDownZIndex = -10;
  priorityDropDownOpacity = 0;

  // status box properties
  statusText: string;
  statusBackground: string;

  // priority box properties
  priorityText: string;
  priorityBackground: string;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngOnInit() {
    this.todoTaskService.setTaskId(this.taskId);
    this.todoTaskService.setTaskName(this.taskName);
    if (this.taskId != null || this.taskId === 0) {
      this.updateView();
    }
  }

  updateView() {
    this.todoTaskService.loadTask().then(data => {
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setBlockId(data['blockId']);
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setTaskListId(data['taskListId']);
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setTaskIndex(data['taskIndex']);
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setTaskName(data['taskName']);
      this.taskName = this.todoTaskService.getTaskName();
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setStatusId(data['statusId']);
      let id: number = this.todoTaskService.getStatusId();
      if (id === 0) {
        this.statusText = 'Done';
        this.statusBackground = '#8CD645';
      } else if (id === 1) {
        this.statusText = 'Working on it';
        this.statusBackground = '#F6A000';
      } else {
        this.statusText = 'Stuck';
        this.statusBackground = '#E04B69';
      }
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setDisplayDate(data['displayDate']);
      // tslint:disable-next-line: no-string-literal
      this.todoTaskService.setPriorityId(data['priorityId']);
      id = this.todoTaskService.getPriorityId();
      if (id === 0) {
        this.priorityText = 'Low';
        this.priorityBackground = '#8CD645';
      } else if (id === 1) {
        this.priorityText = 'Medium';
        this.priorityBackground = '#F6A000';
      } else {
        this.priorityText = 'High';
        this.priorityBackground = '#E04B69';
      }
    });

  }

  disableDrag() {
    this.todoListComponent.disableCdkDrag = true;
  }

  enableDrag() {
    this.todoListComponent.disableCdkDrag = false;
  }

  preventNewLineCreation(event) {
    event.preventDefault();
  }

  showStatusDropDown() {
    this.statusDropDownZIndex = 10;
    this.statusDropDownOpacity = 100;
  }

  hideStatusDropDown() {
    this.statusDropDownZIndex = -10;
    this.statusDropDownOpacity = 0;
  }

  setStatus(id: number, text: string, background: string) {
    this.statusDropDownZIndex = -10;
    this.statusDropDownOpacity = 0;
    this.statusText = text;
    this.statusBackground = background;
    this.todoTaskService.setStatusId(id);
    this.todoTaskService.updateTask();
  }

  showPriorityDropDown() {
    this.priorityDropDownZIndex = 10;
    this.priorityDropDownOpacity = 100;
  }

  hidePriorityDropDown() {
    this.priorityDropDownZIndex = -10;
    this.priorityDropDownOpacity = 0;
  }

  setPriority(id: number, text: string, background: string) {
    this.priorityDropDownZIndex = -10;
    this.priorityDropDownOpacity = 0;
    this.priorityText = text;
    this.priorityBackground = background;
    this.todoTaskService.setPriorityId(id);
    this.todoTaskService.updateTask();
  }

  dateChange(event) {
    const month: string = this.months[event.value.getMonth()];
    const day: string = event.value.getDate();
    const displayDate = month + ' ' + day;
    this.todoTaskService.setDisplayDate(displayDate);
    this.todoTaskService.updateTask();
  }

  deleteTask() {
    const thisWeekIndex: number = this.todoListComponent.thisWeekList.indexOf(this.taskId);
    const nextWeekIndex: number = this.todoListComponent.nextWeekList.indexOf(this.taskId);
    const completedIndex: number = this.todoListComponent.completedList.indexOf(this.taskId);
    if (thisWeekIndex !== -1) {
      this.todoListComponent.thisWeekList.splice(thisWeekIndex, 1);
    } else if (nextWeekIndex !== -1) {
      this.todoListComponent.nextWeekList.splice(nextWeekIndex, 1);
    } else {
      this.todoListComponent.completedList.splice(completedIndex, 1);
    }
    this.todoListComponent.updateLocations();
    this.todoTaskService.deleteTask();
  }

  updateName(innerHtml) {
    this.todoTaskService.setTaskName(innerHtml);
    this.todoTaskService.updateTask();
  }


}
