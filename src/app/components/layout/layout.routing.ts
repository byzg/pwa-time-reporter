import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { WishesComponent } from '../../routes/wishes';

const routes: Routes = [
  {
    // I think path: '' does not make sense here, so, it here
    // just for to make RouterModule work
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'wishes',       component: WishesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
