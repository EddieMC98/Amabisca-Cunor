import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoMotivo} from '../../../@core/modelos/tipo-motivo';
import { TipoMotivoService } from '../../../@core/data/tipo-motivo.service';
import { EstadoService} from '../../../@core/data/estado-service';
import { Estado} from '../../../@core/modelos/estado';

@Component({
  selector: 'ngx-modal-motivo-descarte',
  templateUrl: './tipo-motivo-modal.component.html',
})
export class TipoMotivoModalComponent {
  public item = new TipoMotivo();
  modalHeader: string;
  public esNuevo: Boolean = false;
  private lstEstado : Estado[];
  
  constructor(private activeModal: NgbActiveModal, private service: TipoMotivoService, private srvEstado: EstadoService) { 
    this.srvEstado.findAll().subscribe(
      items => {
        this.lstEstado = items;
      },
      err => {
        console.log(err);
      }
 
    );
   }

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