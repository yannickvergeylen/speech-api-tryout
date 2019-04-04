import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WebSpeechService} from '../web-speech/web-speech.service';
import {WebSpeechComponent} from '../web-speech/web-speech.component';
import {AnnyangService} from '../annyang/annyang.service';
import {ArtyomService} from '../artyom/artyom.service';
import {SlidesComponent} from '../slides/slides.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WebSpeechComponent,
    SlidesComponent
  ],
  entryComponents: [
    SlidesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [WebSpeechService, AnnyangService, ArtyomService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
