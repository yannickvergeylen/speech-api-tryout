import {Component} from '@angular/core';
import {AnnyangService} from '../annyang/annyang.service';



@Component({
  selector: 'yakke-web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {

  constructor(private webSpeechService:AnnyangService) {
    this.webSpeechService.result$.subscribe(console.log)
  }

  public start(event) {
    this.webSpeechService.start();
  }

  public stop(event) {
    // this.webSpeechService.stop();
  }
}