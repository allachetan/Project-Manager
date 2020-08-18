import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  private taskId: number;
  private blockId: number;
  private taskListId: number;
  private taskIndex: number;
  private taskName: string;
  private statusId = 2;
  private displayDate = 'Apr 12';
  private priorityId = 0;
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getTaskId() {
    return this.taskId;
  }

  public setTaskId(id: number) {
    this.taskId = id;
  }

  public getBlockId() {
    return this.blockId;
  }

  public setBlockId(id: number) {
    this.blockId = id;
  }

  public getTaskListId() {
    return this.taskListId;
  }

  public setTaskListId(id: number) {
    this.taskListId = id;
  }

  public getTaskIndex() {
    return this.taskIndex;
  }

  public setTaskIndex(index: number) {
    this.taskIndex = index;
  }

  public getTaskName() {
    return this.taskName;
  }

  public setTaskName(name: string) {
    this.taskName = name;
  }

  public getStatusId() {
    return this.statusId;
  }

  public setStatusId(id: number) {
    this.statusId = id;
  }

  public getDisplayDate() {
    return this.displayDate;
  }

  public setDisplayDate(date: string) {
    this.displayDate = date;
  }

  public getPriorityId() {
    return this.priorityId;
  }

  public setPriorityId(id: number) {
    this.priorityId = id;
  }

  public loadTask() {
    return this.http.get(this.url + 'task/get/'
      + this.taskId).toPromise();
  }

  public deleteTask() {
      this.http.get(this.url + 'task/delete/' + this.taskId).subscribe();
  }

  public updateTask() {
    if (this.taskId != null) {
      const postData = {
        taskId: this.taskId,
        blockId: this.blockId,
        taskListId: this.taskListId,
        taskIndex: this.taskIndex,
        taskName: this.taskName,
        statusId: this.statusId,
        displayDate: this.displayDate,
        priorityId: this.priorityId
      };
      this.http.post(this.url + 'task/mod', postData).subscribe();
    }
  }

}
