import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-intercambio-dialog',
  templateUrl: './intercambio-dialog.component.html',
})
export class IntercambioDialogComponent {
  titulo: string;
  mensaje:string;
  
  constructor(private activeModal: NgbActiveModal, ) { }

  guardar() {
    this.activeModal.close("Confirmación");
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}