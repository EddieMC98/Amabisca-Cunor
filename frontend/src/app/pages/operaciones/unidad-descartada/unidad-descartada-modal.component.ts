import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadDescartada} from '../../../@core/modelos/unidad-descartada';
import { UnidadDescartadaService } from '../../../@core/data/unidad-descartada.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TipoDescarte } from '../../../@core/modelos/tipo-descarte';
import { TipoDescarteService } from '../../../@core/data/tipo-descarte.service';
import { TipoComponente } from '../../../@core/modelos/tipo_componente';
import { TipoComponenteService } from '../../../@core/data/tipo-componente.service';
@Component({
  selector: 'ngx-modal-unidad-descartada',
  styleUrls: ['./unidad-descartada-modal.component.scss'],
  templateUrl: './unidad-descartada-modal.component.html',
})
export class UnidadDescartadaModalComponent {
  public item = new UnidadDescartada();
  modalHeader: string;
  public esNuevo: Boolean = false;
  public fec_creacion;
  private lstDescartes : TipoDescarte[];
  private lstComponentes : TipoComponente[];
  
  constructor(private activeModal: NgbActiveModal, private service: UnidadDescartadaService, private serviceTipoDescarte: TipoDescarteService, private serviceTipoComponente: TipoComponenteService) {
    this.serviceTipoDescarte.findAll().subscribe(
      items => {
        this.lstDescartes = items;
      },
      err => {
        console.log(err);
      }
 
    );

    this.serviceTipoComponente.findAll().subscribe(
      items => {
        this.lstComponentes = items;
      },
      err => {
        console.log(err);
      }
 
    );
  }

  guardar() {
    if (this.esNuevo){
      this.item.fec_creacion = new Date(this.fec_creacion.year, this.fec_creacion.month-1, this.fec_creacion.day);
      this.service.guardar(this.item).subscribe(
              data => {
                this.activeModal.close("Registro guardado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }else{
      this.item.fec_creacion = new Date(this.fec_creacion.year, this.fec_creacion.month-1, this.fec_creacion.day);
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