import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';
import Artyom from 'artyom.js/build/artyom.js';

// interface IWindow extends Window {
//   annyang: any & { addCommands: () => {}, init: () => {} };
// }

@Injectable()
export class ArtyomService {

  constructor() {
    this.artyom = new Artyom();
  }

  private artyom: any;
  public result$ = new Subject();

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
      action: () => this.emitTheResult('SHOW_SINT_NIKLAAS')
    },
    {
      indexes: ['Appartement'],
      action: () => this.emitTheResult('APPARTEMENT')
    },
    {
      indexes: ['vriendin'],
      action: () => this.emitTheResult('SHOW_JUDITH')
    },
    {
      indexes: ['kat'],
      action: () => this.emitTheResult('SHOW_KAT')
    },
    {
      indexes: ['honden'],
      action: () => this.emitTheResult('SHOW_HOND')
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
      indexes: ['down'],
      action: () => this.emitTheResult('SHOW_DOWN')
    },
    {
      indexes: ['high five'],
      action: () => this.emitTheResult('SHOW_HIGH_FIVE')
    },
    {
      indexes: ['jump'],
      action: () => this.emitTheResult('SHOW_JUMP')
    },
    {
      indexes: ['roll'],
      action: () => this.emitTheResult('SHOW_ROLL')
    },
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

  private emitTheResult(event) {
    this.result$.next(event);
  }
}
