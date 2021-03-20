import { Component } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UnidadIntercambio} from '../../../@core/modelos/unidad-intercambio';
import { UnidadIntercambioService } from '../../../@core/data/unidad-intercambio.service';
import { EstadoService} from '../../../@core/data/estado-service';
import { Estado} from '../../../@core/modelos/estado';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';
import { TipoSangre } from '../../../@core/modelos/tipo-sangre';
import { TipoComponenteService } from '../../../@core/data/tipo-componente.service';
import { TipoComponente } from '../../../@core/modelos/tipo_componente';
import { TipoIntercambioService } from '../../../@core/data/tipo-intercambio.service';
import { TipoIntercambio } from '../../../@core/modelos/tipo-intercambio';

@Component({
  selector: 'ngx-modal-intercambio',
  templateUrl: './intercambio-modal.component.html',
})
export class IntercambioModalComponent {
  public item = new UnidadIntercambio();
  modalHeader: string;
  public esNuevo: Boolean = false;
  private lstTipoSangre : TipoSangre[];
  private lstComponente : TipoComponente[];
  private lstTipoIntercambio:TipoIntercambio[];
  public fec_creacion : NgbDateStruct;
  
  constructor(private activeModal: NgbActiveModal, private service: UnidadIntercambioService, private srvTipoSangre: TipoSangreService, private srvTipoComponente: TipoComponenteService, private srvTipoIntercambio: TipoIntercambioService) { 
    this.srvTipoSangre.findAll().subscribe(
      items => {
        this.lstTipoSangre = items;
      },
      err => {
        console.log(err);
      }
 
    );

    this.srvTipoIntercambio.findAll().subscribe(
      items => {
        this.lstTipoIntercambio = items;
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