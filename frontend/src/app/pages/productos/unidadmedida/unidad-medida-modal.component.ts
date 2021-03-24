import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadMedidaService } from '../../../@core/data/unidad-medida.service';
import { UnidadMedida } from '../../../@core/modelos/unidad-medida';

@Component({
  selector: 'ngx-modalunidadmedida',
  templateUrl: './unidad-medida-modal.component.html',
})
export class UnidadMedidaModalComponent {
  public item = new UnidadMedida();
  modalHeader: string;
  public esNuevo: Boolean = false;

  constructor(private activeModal: NgbActiveModal, private service: UnidadMedidaService) { }

  guardar() {

    var y: number = +this.item.estadoActivo;
    this.item.estadoActivo=y;
    if (this.esNuevo){
     this.service.addUnidad(this.item).subscribe(
              data => {
                this.activeModal.close("Registro guardado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }else{
      this.service.updateUnidad(this.item).subscribe(
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
