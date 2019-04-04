import {Component} from '@angular/core';
import {ArtyomService} from '../artyom/artyom.service';

@Component({
  selector: 'app-web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {

  constructor(private webSpeechService: ArtyomService) {}

  public start(event) {
    this.webSpeechService.start();
  }

  public startQuick() {
    this.webSpeechService.startQuick();
  }

  public stop(event) {
    this.webSpeechService.stop();
  }
}