import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { AboutComponent } from './shared/component/about/about.component';
import { TodoComponent } from './shared/component/todo/todo.component';

const routes: Routes = [
  { path : '', redirectTo : 'home' , pathMatch:'full' },
  { path : 'home' , component:HomeComponent},
  { path : 'about' , component:AboutComponent},
  { path : 'todo' , component:TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
