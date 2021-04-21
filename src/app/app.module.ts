import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';


@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
