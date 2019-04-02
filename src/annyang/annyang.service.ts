import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';

interface IWindow extends Window {
  annyang: any & { addCommands: () => {}, init: () => {} };
}

@Injectable()
export class AnnyangService {
  private annyang: any;
  private commands = ['hi','ordina','yannick'];
  public result$ = new Subject();

  constructor() {
    this.annyang = (<IWindow>window).annyang;
    this.annyang.debug(true);
  }

  public start() {
    this.annyang.start({ autoRestart: true, continuous: false });
    const commands = this.commands.reduce((acc, cur) => ({...acc, ...{[cur]: () => this.emitTheResult(cur)}}),{});
    this.annyang.addCommands(commands);
  }

  private emitTheResult(event) {
    this.result$.next(event);
  }


  //
  // public stop() {
  //   this.recognition.stop();
  // }
}