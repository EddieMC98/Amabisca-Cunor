import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tipo-donacion-dialog',
  templateUrl: './tipo-donacion-dialog.component.html',
})
export class TipoDonacionDialogComponent {
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