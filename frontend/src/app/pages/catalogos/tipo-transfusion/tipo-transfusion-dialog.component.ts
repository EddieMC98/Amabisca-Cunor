import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tipo-transfusion-dialog',
  templateUrl: './tipo-transfusion-dialog.component.html',
})
export class TipoTransfusionDialogComponent {
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