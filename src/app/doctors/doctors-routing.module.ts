import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsPage } from './doctors.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorsPage,
    children: [
      {
        path: 'settings',
        component: DoctorsPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsPageRoutingModule {}
