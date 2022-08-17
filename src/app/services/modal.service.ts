import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private isVisible: boolean = false;

  constructor() { }

  isOpen() {
    return this.isVisible;
  }

  toggleIsVisible() {
    this.isVisible = ! this.isVisible;
  }
}
