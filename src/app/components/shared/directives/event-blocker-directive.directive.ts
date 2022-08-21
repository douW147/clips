import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirectiveDirective {

  @HostListener("drop", ["$event"])
  @HostListener("dragover", ["$event"])
  public eventHandler(event: Event) {
    event.preventDefault();
  }

}
