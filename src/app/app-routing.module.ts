import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './online-store/create/create.component';
import { EditComponent } from './online-store/edit/edit.component';
import { ListComponent } from './online-store/list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'online-store/list',
    pathMatch: 'full'
  },
  {
    path: 'online-store/list',
    component: ListComponent,
  },
  {
    path: 'online-store/create',
    component: CreateComponent,
  },
  {
    path: 'online-store/edit',
    component: EditComponent,
  },
  {
    path: 'online-store/edit/:id',
    component: EditComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
