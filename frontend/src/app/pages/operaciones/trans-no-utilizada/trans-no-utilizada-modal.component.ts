import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransNoUtilizada} from '../../../@core/modelos/trans-no-utilizada';
import { TransNoUtilizadaService } from '../../../@core/data/trans-no-utilizada.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';
import { TipoSangre } from '../../../@core/modelos/tipo-sangre';
@Component({
  selector: 'ngx-modal-trans-no-utilizada',
  styleUrls: ['./trans-no-utilizada-modal.component.scss'],
  templateUrl: './trans-no-utilizada-modal.component.html',
})
export class TransNoUtilizadaModalComponent {
  public item = new TransNoUtilizada();
  modalHeader: string;
  public esNuevo: Boolean = false;
  public fec_creacion;
  private lstTipoSangre : TipoSangre[];
  
  constructor(private activeModal: NgbActiveModal, private service: TransNoUtilizadaService, private serviceTipoSangre: TipoSangreService) {
    this.serviceTipoSangre.findAll().subscribe(
      items => {
        this.lstTipoSangre = items;
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