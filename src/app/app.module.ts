import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSpeechService} from '../web-speech/web-speech.service';
import {WebSpeechComponent} from '../web-speech/web-speech.component';

@NgModule({
  declarations: [
    AppComponent,
    WebSpeechComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [WebSpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
