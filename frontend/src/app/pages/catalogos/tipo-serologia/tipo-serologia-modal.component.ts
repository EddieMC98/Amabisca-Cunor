import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoSerologia} from '../../../@core/modelos/tipo-serologia';
import { TipoSerologiaService } from '../../../@core/data/tipo-serologia.service';

@Component({
  selector: 'ngx-modal-tipo-serologia',
  templateUrl: './tipo-serologia-modal.component.html',
})
export class TipoSerologiaModalComponent {
  public item = new TipoSerologia();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoSerologiaService,) { }

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