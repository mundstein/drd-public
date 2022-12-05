import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnamnesisPage } from './anamnesis.page';

const routes: Routes = [
  { path: '', component: AnamnesisPage },
  { 
    path: 'allergies', 
    loadChildren: () => import('../forms/allergies/allergies.module').then(m => m.AllergiesPageModule) 
  },
  { 
    path: 'body', 
    loadChildren: () => import('../forms/measurements/measurements.module').then(m => m.MeasurementsPageModule) 
  },
  { 
    path: 'illnesses', 
    data: { title: 'illnesses' },
    loadChildren: () => import('../forms/list-form/list-form.module').then(m => m.ListFormPageModule) 
  },
  { 
    path: 'surgeries', 
    data: { title: 'surgeries' },
    loadChildren: () => import('../forms/list-form/list-form.module').then(m => m.ListFormPageModule) 
  },
  { 
    path: 'medications', 
    data: { title: 'medications' },
    loadChildren: () => import('../forms/list-form/list-form.module').then(m => m.ListFormPageModule)
  },
  { 
    path: 'acute', 
    data: { title: 'acute' },
    loadChildren: () => import('../forms/list-form/list-form.module').then(m => m.ListFormPageModule)
  },
  {
    path: 'checkup',
    loadChildren: () => import('../forms/checkup/checkup.module').then(m => m.CheckupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnamnesisPageRoutingModule {}
