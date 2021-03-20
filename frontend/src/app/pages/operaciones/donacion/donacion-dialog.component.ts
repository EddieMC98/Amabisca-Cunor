import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-donacion-dialog',
  templateUrl: './donacion-dialog.component.html',
})
export class DonacionDialogComponent {
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