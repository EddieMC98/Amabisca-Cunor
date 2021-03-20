import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DonacionExterna} from '../../../@core/modelos/donacion-externa';
import { DonacionExternaService } from '../../../@core/data/donacion-externa.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TipoDescarte } from '../../../@core/modelos/tipo-descarte';
import { TipoDescarteService } from '../../../@core/data/tipo-descarte.service';
@Component({
  selector: 'ngx-modal-donacion-externa',
  styleUrls: ['./donacion-externa-modal.component.scss'],
  templateUrl: './donacion-externa-modal.component.html',
})
export class DonacionExternaModalComponent {
  public item = new DonacionExterna();
  modalHeader: string;
  public esNuevo: Boolean = false;
  public fec_creacion;
  private lstDescartes : TipoDescarte[];
  
  constructor(private activeModal: NgbActiveModal, private service: DonacionExternaService, private serviceTipoDescarte: TipoDescarteService) {
    this.serviceTipoDescarte.findAll().subscribe(
      items => {
        this.lstDescartes = items;
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