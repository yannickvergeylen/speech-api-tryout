import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ArtyomService} from '../artyom/artyom.service';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlidesComponent {
  public visibility$ = new Subject<Visibilities>();

  constructor(private webSpeechService: ArtyomService, private cdr: ChangeDetectorRef) {
    this.webSpeechService.result$
      .pipe(
        tap(command => command === 'SHOW_YANNICK' && this.show('Yannick')),
        tap(command => command === 'SHOW_ORDINA' && this.show('Ordina')),
        tap(command => command === 'SHOW_SINT-NIKLAAS' && this.show('SintNiklaas')),
        tap(command => command === 'SHOW_JUDITH' && this.show('Judith')),
        tap(command => command === 'SHOW_CAT' && this.show('Cat')),
        tap(command => command === 'SHOW_TINTO' && this.show('Tinto')),
        tap(command => command === 'SHOW_ZIT' && this.show('TintoZit')),
        tap(command => command === 'SHOW_HIGH_FIVE' && this.show('TintoHighFive')),
        tap(command => command === 'SHOW_ROLL' && this.show('TintoRoll'))
      )
      .subscribe();
  }

  private show(key) {
    this.hideAll();
    this.visibility$.next({[`show${key}`]: true});
    this.detectChanges();
  }

  private hideAll() {
    this.visibility$.next({});
  }

  private detectChanges() {
    this.cdr.detectChanges();
  }
}

interface Visibilities {
  showYannick?: boolean;
  showOrdina?: boolean;
  showSintNiklaas?: boolean;
  showJudith?: boolean;
  showCat?: boolean;
  showTinto?: boolean;
  showTintoZit?: boolean;
  showTintoHighFive?: boolean;
  showTintoRoll?: boolean;
}
