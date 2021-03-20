import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoDescarte} from '../../../@core/modelos/tipo-descarte';
import { TipoDescarteService } from '../../../@core/data/tipo-descarte.service';

@Component({
  selector: 'ngx-modal-tipo-descarte',
  templateUrl: './tipo-descarte-modal.component.html',
})
export class TipoDescarteModalComponent {
  public item = new TipoDescarte();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoDescarteService,) { }

  guardar() {
    if (this.esNuevo){
      this.service.guardar(this.item).subscribe(
              data => {
                this.activeModal.close("Registro guardado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }else{
      this.service.actualizar(this.item).subscribe(
              data => {
                this.activeModal.close("Registro actualizado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}