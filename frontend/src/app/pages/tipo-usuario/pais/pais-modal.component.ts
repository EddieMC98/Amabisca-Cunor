import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaisService } from '../../../@core/data/pais.service';
import { Pais } from '../../../@core/modelos/pais';

@Component({
  selector: 'ngx-pais-modal',
  templateUrl: './pais-modal.component.html',
  styleUrls: ['./pais-modal.component.scss']
})
export class PaisModalComponent implements OnInit {
  public item = new Pais();
  modalHeader: string;
  public esNuevo: Boolean = false;
  paisForm:FormGroup;
  //CodPais:number;

  constructor(private activeModal: NgbActiveModal, private service: PaisService,private _builder:FormBuilder) {
    this.paisForm=this._builder.group({
      nomPais:['',Validators.compose([Validators.required,Validators.maxLength(100)])],
      acronimo:['',Validators.compose([Validators.required,Validators.maxLength(10)])],
    });

   }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  guardar() {
    if (this.esNuevo){
      var y = +this.item.codPais;
      var z = +this.item.estadoActivo;
      this.item.estadoActivo = z;

      this.service.guardar(this.item).subscribe(
              data => {
                this.activeModal.close("Registro guardado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }else{
      var z = +this.item.estadoActivo;
      this.item.estadoActivo = z;
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

}
