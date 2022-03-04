import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/login/containers/login/login.component';
import { LoginGuard } from './features/login/guards/login.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'buyer-auctions',
    loadChildren: () => import('./features/buyer-auctions/buyer-auctions.module').then((m) => m.BuyerAuctionsModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
