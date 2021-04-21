import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//Modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NotpagefoundComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
