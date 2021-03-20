import { Component } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Fraccionamiento} from '../../../@core/modelos/fraccionamiento';
import { FraccionamientoService } from '../../../@core/data/fraccionamiento.service';
import { EstadoService} from '../../../@core/data/estado-service';
import { Estado} from '../../../@core/modelos/estado';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';
import { TipoSangre } from '../../../@core/modelos/tipo-sangre';
import { TipoComponenteService } from '../../../@core/data/tipo-componente.service';
import { TipoComponente } from '../../../@core/modelos/tipo_componente';

@Component({
  selector: 'ngx-modal-fraccionamiento',
  templateUrl: './fraccionamiento-modal.component.html',
})
export class FraccionamientoModalComponent {
  public item = new Fraccionamiento();
  modalHeader: string;
  public esNuevo: Boolean = false;
  private lstTipoSangre : TipoSangre[];
  private lstComponente : TipoComponente[];
  public fec_creacion : NgbDateStruct;
  
  constructor(private activeModal: NgbActiveModal, private service: FraccionamientoService, private srvTipoSangre: TipoSangreService, private srvTipoComponente: TipoComponenteService) { 
    this.srvTipoSangre.findAll().subscribe(
      items => {
        this.lstTipoSangre = items;
      },
      err => {
        console.log(err);
      }
 
    );

    this.srvTipoComponente.findAll().subscribe(
      items => {
        this.lstComponente = items;
      },
      err => {
        console.log(err);
      }
 
    );

   }

  guardar() {
    this.item.fec_creacion = new Date(this.fec_creacion.year, this.fec_creacion.month-1, this.fec_creacion.day);
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