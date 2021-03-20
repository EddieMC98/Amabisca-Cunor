import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GrupoEtnico} from '../../../@core/modelos/grupo-etnico';
import { GrupoEtnicoService } from '../../../@core/data/grupo-etnico.service';

@Component({
  selector: 'ngx-modal-grupo-etnico',
  templateUrl: './grupo-etnico-modal.component.html',
})
export class GrupoEtnicoModalComponent {
  public item = new GrupoEtnico();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: GrupoEtnicoService,) { }

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