import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShortPressDirectiveDirective } from './short-press-directive.directive';
import { LongPressDirectiveDirective } from './long-press-directive.directive';
import { LongMousedownDirectiveDirective } from './long-mousedown-directive.directive';
import { BlockComponent } from './block/block.component';
import { BlockConnectorComponent } from './block-connector/block-connector.component';
import { FullBlockComponent } from './full-block/full-block.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DragDropModule } from '@angular/cdk/drag-drop';

import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    BlockConnectorComponent,
    ShortPressDirectiveDirective,
    LongPressDirectiveDirective,
    LongMousedownDirectiveDirective,
    BlockComponent,
    FullBlockComponent,
    TodoListComponent,
    TodoTaskComponent,
    LoginComponent,
    HomeComponent
  ],
  entryComponents: [BlockComponent, BlockConnectorComponent, FullBlockComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
