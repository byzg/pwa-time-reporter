import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './components/layout/layout.module#LayoutModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './routes/login/login.module#LoginModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
