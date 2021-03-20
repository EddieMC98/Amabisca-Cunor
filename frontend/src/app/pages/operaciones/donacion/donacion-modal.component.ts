import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PersonaService } from '../../../@core/data/persona.service';
import { Persona } from '../../../@core/modelos/persona';
@Component({
  selector: 'ngx-modal-donacion',
  styleUrls: ['./donacion-modal.component.scss'],
  templateUrl: './donacion-modal.component.html',
})
export class DonacionModalComponent {
  modalHeader: string;
  public tipo: number;
  public texto_busqueda: string = "";
  public lstPersonas: Persona[];
  public mensaje: string = "";
  public showMensaje: boolean = false;

  constructor(private activeModal: NgbActiveModal, private service: PersonaService) {
    
  }

  buscarPersona(){
    if (this.texto_busqueda!= ""){
        this.showMensaje = false;
        this.service.findAllBy(this.texto_busqueda).subscribe(
          items => {
            this.lstPersonas = items;
            if (this.lstPersonas.length == 0){
              this.showMensaje = true;
              this.mensaje = "No se encontraron resultados.";
            }
          },
          err => {
            console.log(err);
          }
    
        );  
    }else{
      this.showMensaje = true;
      this.mensaje = "Debe ingresar un texto para la búsqueda de personas.";
    }
  }

  seleccionar(item:Persona){
    this.activeModal.close(item);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}