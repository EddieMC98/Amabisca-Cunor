import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoDonacion} from '../../../@core/modelos/tipo-donacion';
import { TipoDonacionService } from '../../../@core/data/tipo-donacion.service';

@Component({
  selector: 'ngx-modal-donacion-descarte',
  templateUrl: './tipo-donacion-modal.component.html',
})
export class TipoDonacionModalComponent {
  public item = new TipoDonacion();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoDonacionService,) { }

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