import {Component} from '@angular/core';
import {WebSpeechService} from './web-speech.service';



@Component({
  selector: 'yakke-web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {

  constructor(private webSpeechService:WebSpeechService) {
    this.webSpeechService.result$.subscribe(console.log)
  }

  public start(event) {
    this.webSpeechService.start();
  }

  public stop(event) {
    this.webSpeechService.stop();
  }
}