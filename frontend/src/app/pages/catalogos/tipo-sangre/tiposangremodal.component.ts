import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoSangre} from '../../../@core/modelos/tipo-sangre';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';

@Component({
  selector: 'ngx-modaltiposangre',
  templateUrl: './tiposangremodal.component.html',
})
export class TipoSangreModalComponent {
  public item = new TipoSangre();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: TipoSangreService,) { }

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