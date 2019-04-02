import {Injectable} from '@angular/core';
import {from, fromEvent, Observable} from 'rxjs/index';
import {filter, map, mergeMap} from 'rxjs/internal/operators';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  webkitSpeechGrammarList: any & SpeechGrammarList;
}

interface SpeechGrammarList {
  item: () => {};
  addFromURI: () => {};
  addFromString: () => {};
}

interface SpeechGrammar {
  src: string;
  weight?: number;
}

interface SpeechRecognitionAlternative {
  confidence: number;
  transcript: string;
}

interface SpeechRecognitionResult extends Array<SpeechRecognitionAlternative> {
  isFinal: boolean
}

interface SpeechRecognitionEvent {
  results: Array<SpeechRecognitionResult>
  resultIndex: number;
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
    this.recognition.grammars = this.getGrammar();

    this.result$ = fromEvent(this.recognition, 'result').pipe(
      map((event: SpeechRecognitionEvent) => {
        let interim = [];
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            return [event.results[i][0]];
          } else {
            interim.push(event.results[i][0]);
          }
        }
        return interim;
      }),
      mergeMap((recognitions: SpeechRecognitionAlternative[]) => from(recognitions.map(({transcript, confidence}) => ({
        transcript,
        confidence
      })))),
      filter(recognition => recognition.confidence > 0.1)
    );
  }

  private getGrammar() {
    const {webkitSpeechGrammarList} : IWindow = <IWindow>window;

    const speechRecognitionList = new webkitSpeechGrammarList();
    this.grammars.forEach(grammar => speechRecognitionList.addFromString(grammar, 1));
    return speechRecognitionList;
  }

  public start() {
    this.recognition.start();
  }

  public stop() {
    this.recognition.stop();
  }

  private grammars = [
    `#JSGF V1.0; grammar work; <work> = /1/ Ordina | /1/ werk voor Ordina | /1/ werk bij Ordina;`,
    `#JSGF V1.0; grammar name; <name> = /1/ Yannick | /1/ mijn naam is Yannick | /3/ ik heet Yannick | /1/ Yannick Vergeylen | /2/ Vergeylen Yannick | /2/ mijn naam is Vergeylen Yannick;`
  ];
}