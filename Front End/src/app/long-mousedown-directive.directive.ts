import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appLongMousedownDirective]'
})
export class LongMousedownDirectiveDirective {

  constructor() { }

  @Output()
  appLongMousedownDirective = new EventEmitter();

  private timeout: any;

  @HostListener('mousedown', ['$event']) onMouseDown(e) {
    this.timeout = setTimeout(() => {
      this.appLongMousedownDirective.emit(e);
    }, 500);
  }

  @HostListener('mouseup') onMouseUp() {
    clearTimeout(this.timeout);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timeout);
  }

}
