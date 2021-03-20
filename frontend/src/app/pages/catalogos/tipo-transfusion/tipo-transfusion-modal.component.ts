import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoTransfusion} from '../../../@core/modelos/tipo-transfusion';
import { TipoTransfusionService } from '../../../@core/data/tipo-transfusion.service';

@Component({
  selector: 'ngx-modal-tipo-transfusion',
  templateUrl: './tipo-transfusion-modal.component.html',
})
export class TipoTransfusionModalComponent {
  public item = new TipoTransfusion();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoTransfusionService,) { }

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