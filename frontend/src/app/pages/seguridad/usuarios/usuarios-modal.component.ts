import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario} from '../../../@core/modelos/usuario';
import { UsuarioService } from '../../../@core/data/usuarios.service';
import { Rol } from '../../../@core/modelos/rol';
import { RolService } from '../../../@core/data/rol.service';

@Component({
  selector: 'ngx-modalusuario',
  templateUrl: './usuarios-modal.component.html',
})
export class UsuariosModalComponent {
  public item = new Usuario();
  modalHeader: string;
  public esNuevo: Boolean = false;
  private lstRoles : Rol[];

  constructor(private activeModal: NgbActiveModal, private service: UsuarioService,private serviceRoles : RolService) {
    this.serviceRoles.findAll().subscribe(
      items => {
        this.lstRoles = items;
      },
      err => {
        console.log(err);
      }

    );
   }

  guardar() {
    if (this.esNuevo){
      var y = +this.item.cod_rol;
      this.item.cod_rol = y;
      var z = +this.item.estado;
      this.item.estado = z;

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
