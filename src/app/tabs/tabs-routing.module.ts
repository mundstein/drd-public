import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'doctors',
        loadChildren: () => import('../doctors/doctors.module').then(m => m.DoctorsPageModule)
      },
      {
        path: 'anamnesis',
        loadChildren: () => import('../anamnesis/anamnesis.module').then(m => m.AnamnesisPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../info/info.module').then(m => m.InfoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/info',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/info',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
