import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule }from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/component/home/home.component';
import { AboutComponent } from './shared/component/about/about.component';
import { TodoComponent } from './shared/component/todo/todo.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { OneComponent } from './shared/component/one/one.component';
import { TwoComponent } from './shared/component/two/two.component';
import { MaterialModule } from './material/material/material.module';
import { ThreeComponent } from './shared/component/three/three.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './shared/component/todo-form/todo-form.component';
import { TodoListComponent } from './shared/component/todo-list/todo-list.component';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { LoaderInterceptor } from './shared/service/loader.interceptor';
import { StdFormComponent } from './shared/component/std-form/std-form.component';
import { StdTableComponent } from './shared/component/std-table/std-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TodoComponent,
    NavbarComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    TodoFormComponent,
    TodoListComponent,
    GetConfirmComponent,
    LoaderComponent,
    StdFormComponent,
    StdTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : LoaderInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
