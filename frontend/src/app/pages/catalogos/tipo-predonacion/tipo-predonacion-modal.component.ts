import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPredonacion} from '../../../@core/modelos/tipo-predonacion';
import { TipoPredonacionService } from '../../../@core/data/tipo-predonacion.service';

@Component({
  selector: 'ngx-modal-predonacion',
  templateUrl: './tipo-predonacion-modal.component.html',
})
export class TipoPredonacionModalComponent {
  public item = new TipoPredonacion();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoPredonacionService,) { }

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