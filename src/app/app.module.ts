import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OnlineStoreModule } from './online-store/online-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatSidenavModule,
  MatButtonToggleModule,
  MatButtonModule,

];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnlineStoreModule,
    BrowserAnimationsModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
