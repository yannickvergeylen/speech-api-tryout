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
        tap(command => command === 'SHOW_YANNICK' && this.showYannick()),
        tap(command => command === 'SHOW_ORDINA' && this.showOrdina()),
        tap(command => command === 'SHOW_SINT_NIKLAAS' && this.showSintNiklaas()),
        tap(command => command === 'SHOW_JUDITH' && this.showJudith()),
        tap(command => command === 'SHOW_KAT' && this.showCat()),
        tap(command => command === 'SHOW_TINTO' && this.showTinto()),
        tap(command => command === 'TINTO_ZIT' && this.showTintoZit()),
        tap(command => command === 'TINTO_HIGH_FIVE' && this.showTintoHighFive())
      )
      .subscribe();
  }

  private showYannick() {
    this.hideAll();
    this.visibility$.next({showYannick: true});
    this.detectChanges();
  }

  private showOrdina() {
    this.hideAll();
    this.visibility$.next({showOrdina: true});
    this.detectChanges();
  }

  private showSintNiklaas() {
    this.hideAll();
    this.visibility$.next({showSintNiklaas: true});
    this.detectChanges();
  }

  private showJudith() {
    this.hideAll();
    this.visibility$.next({showJudith: true});
    this.detectChanges();
  }

  private showCat() {
    this.hideAll();
    this.visibility$.next({showCat: true, showJudith: true});
    this.detectChanges();
  }

  private showTinto() {
    this.hideAll();
    this.visibility$.next({showTinto: true});
    this.detectChanges();
  }

  private showTintoZit() {
    this.hideAll();
    this.visibility$.next({showTintoZit: true});
    this.detectChanges();
  }

  private showTintoHighFive() {
    this.hideAll();
    this.visibility$.next({showTintoHighFive: true});
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
}
