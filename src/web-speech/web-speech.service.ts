import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs/index';
import {filter, map} from 'rxjs/internal/operators';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class WebSpeechService {
  private recognition;
  public result$: Observable<any>;

  constructor() {
    const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.result$ = fromEvent(this.recognition, 'result').pipe(
      map(event => event.results)
      // filter(event => event.results[i].isFinal)
    );
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}