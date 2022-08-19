import { Injectable } from '@angular/core';
import { Modal } from '../../models/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Modal[] = [];

  constructor() { }

  register(id: string) {
    const newModal = {
      id: id,
      open: false
    }

    this.modals.push(newModal);
  }

  isOpen(id: string): boolean {
    return !!this.modals.find(modal => modal.id === id)?.open;
  }

  toggleIsVisible(id: string): void {
    const modal = this.modals.find(modal => modal.id === id);

    if (modal) {
      modal.open = !modal.open;
    }
  }
}
