import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Output('appOutsideClick') close = new EventEmitter();

  isOpen = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  public handleClick(event) {
    if (!this.isOpen) {
      this.isOpen = true;
    } else if (!this.elRef.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }
}
