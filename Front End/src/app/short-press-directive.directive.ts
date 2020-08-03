import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appShortPressDirective]'
})
export class ShortPressDirectiveDirective {

  constructor() { }

  @Output()
  appShortPressDirective = new EventEmitter();

  private timeout: any;
  private isShort: boolean;

  @HostListener('mousedown') onMouseDown() {
    this.isShort = true;
    this.timeout = setTimeout(() => {
      this.isShort = false;
    }, 500);
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (this.isShort) {
      this.appShortPressDirective.emit(event);
    }
    clearTimeout(this.timeout);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timeout);
  }

}
