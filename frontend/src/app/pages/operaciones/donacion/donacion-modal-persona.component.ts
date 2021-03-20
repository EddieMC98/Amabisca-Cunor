import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona} from '../../../@core/modelos/persona';
import { PersonaService } from '../../../@core/data/persona.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';
import { TipoSangre } from '../../../@core/modelos/tipo-sangre';
import { GrupoEtnicoService } from '../../../@core/data/grupo-etnico.service';
import { GrupoEtnico } from '../../../@core/modelos/grupo-etnico';
@Component({
  selector: 'ngx-modal-donacion-persona',
  styleUrls: ['./donacion-modal-persona.component.scss'],
  templateUrl: './donacion-modal-persona.component.html',
})
export class DonacionPersonaModalComponent {
  public item = new Persona();
  modalHeader: string;
  public esNuevo: Boolean = false;
  public fec_creacion;
  private lstTipoSangre : TipoSangre[];
  private lstGrupoEtnico : GrupoEtnico[];
  
  constructor(private activeModal: NgbActiveModal, private service: PersonaService, private serviceTipoSangre: TipoSangreService, private serviceGrupo: GrupoEtnicoService) {
    this.serviceTipoSangre.findAll().subscribe(
      items => {
        this.lstTipoSangre = items;
      },
      err => {
        console.log(err);
      }
 
    );

    this.serviceGrupo.findAll().subscribe(
        items => {
          this.lstGrupoEtnico = items;
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