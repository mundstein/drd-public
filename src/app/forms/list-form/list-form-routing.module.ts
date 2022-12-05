import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFormPage } from './list-form.page';

const routes: Routes = [
  {
    path: '',
    component: ListFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFormPageRoutingModule {}
