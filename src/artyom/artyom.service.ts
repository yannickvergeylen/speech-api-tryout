import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';
import Artyom from 'artyom.js/build/artyom.js';

type Command = 'SHOW_YANNICK' | 'SHOW_ORDINA' | 'SHOW_SINT-NIKLAAS' | 'SHOW_JUDITH'
  | 'SHOW_CAT' | 'SHOW_TINTO' | 'SHOW_ZIT' | 'SHOW_HIGH_FIVE' | 'SHOW_ROLL';

@Injectable()
export class ArtyomService {

  constructor() {
    this.artyom = new Artyom();
  }

  private artyom: any;
  public result$ = new Subject<Command>();

  private normalCommands = [
    {
      smart: true,
      indexes: ['Hello, my name is *', 'Hello, i am *', 'Hallo, ik ben *', /.*mijn naam is .*/],
      action: () => this.emitTheResult('SHOW_YANNICK')
    },
    {
      smart: true,
      indexes: [/.*ik werk voor .*/i],
      action: () => this.emitTheResult('SHOW_ORDINA')
    },
    {
      smart: true,
      indexes: [/.*even wat vertellen.*/i, /.*even iets vertellen.*/i],
      action: () => {
        this.stop();
        setTimeout(() => this.startQuick(), 1000);
      }
    }
  ];

  private quickCommands = [
    {
      indexes: ['Sint-Niklaas'],
      action: () => this.emitTheResult('SHOW_SINT-NIKLAAS')
    },
    {
      indexes: ['vriendin'],
      action: () => this.emitTheResult('SHOW_JUDITH')
    },
    {
      indexes: ['kat'],
      action: () => this.emitTheResult('SHOW_CAT')
    },
    {
      indexes: ['Tinto'],
      action: () => this.emitTheResult('SHOW_TINTO')
    },
    {
      indexes: ['zit'],
      action: () => this.emitTheResult('SHOW_ZIT')
    },
    {
      indexes: ['high five'],
      action: () => this.emitTheResult('SHOW_HIGH_FIVE')
    },
    {
      indexes: ['roll'],
      action: () => this.emitTheResult('SHOW_ROLL')
    }
  ];

  public start() {
    this.artyom.initialize({
      lang: 'nl-NL', // GreatBritain english
      mode: 'normal',
      continuous: true, // Listen forever
      soundex: true, // Use the soundex algorithm to increase accuracy
      debug: true, // Show messages in the console
      executionKeyword: 'and do it now',
      listen: true // Start to listen commands !
    }).then(() => {
      console.log('Artyom has been succesfully initialized');
    }).catch((err) => {
      console.error('Artyom couldn\'t be initialized: ', err);
    });
    this.artyom.addCommands(this.normalCommands);
  }

  public startQuick() {
    this.artyom.initialize({
      lang: 'nl-NL', // GreatBritain english
      mode: 'quick',
      continuous: true, // Listen forever
      soundex: true, // Use the soundex algorithm to increase accuracy
      debug: true, // Show messages in the console
      executionKeyword: 'and do it now',
      listen: true // Start to listen commands !
    }).then(() => {
      console.log('Artyom has been succesfully initialized');
    }).catch((err) => {
      console.error('Artyom couldn\'t be initialized: ', err);
    });
    this.artyom.addCommands(this.quickCommands);
  }

  public stop() {
    this.artyom.fatality();
  }

  private emitTheResult(event: Command) {
    this.result$.next(event);
  }
}
