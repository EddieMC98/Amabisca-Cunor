import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tipo-descarte-dialog',
  templateUrl: './tipo-descarte-dialog.component.html',
})
export class TipoDescarteDialogComponent {
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