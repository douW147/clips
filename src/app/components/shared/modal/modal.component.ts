import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/components/shared/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalId = "";

  constructor(
    public modal: ModalService,
    public el: ElementRef) { 
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
    this.modal.register(this.modalId)
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement)
  }

  closeModal() {
    this.modal.toggleIsVisible(this.modalId);
  }

}
