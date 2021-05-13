import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component'
import { BoxService } from './services/box.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
