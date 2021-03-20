import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rol} from '../../../@core/modelos/rol';
import { RolService } from '../../../@core/data/rol.service';

@Component({
  selector: 'ngx-modalroles',
  templateUrl: './roles-modal.component.html',
})
export class RolesModalComponent {
  public item = new Rol();
  modalHeader: string;
  public esNuevo: Boolean = false;
  
  constructor(private activeModal: NgbActiveModal, private service: RolService,) { }

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