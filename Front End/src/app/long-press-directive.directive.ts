import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appLongPressDirective]'
})
export class LongPressDirectiveDirective {

  constructor() { }

  @Output()
  appLongPressDirective = new EventEmitter();

  private timeout: any;
  private isLong: boolean;

  @HostListener('mousedown') onMouseDown() {
    this.isLong = false;
    this.timeout = setTimeout(() => {
      this.isLong = true;
    }, 500);
  }

  @HostListener('mouseup', ['$event']) onMouseUp(e) {
    if (this.isLong) {
      this.appLongPressDirective.emit(e);
    }
    clearTimeout(this.timeout);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timeout);
  }

}
