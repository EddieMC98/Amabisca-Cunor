import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from '../../../@core/data/inventario.service';
import { Inventario } from '../../../@core/modelos/inventario';

@Component({
  selector: 'ngx-inventario-modal',
  templateUrl: './inventario-modal.component.html',
  styleUrls: ['./inventario-modal.component.scss']
})
export class InventarioModalComponent implements OnInit {
  public item = new Inventario();
  modalHeader: string;
  public esNuevo: Boolean = false;
  inventarioForm:FormGroup;

  constructor(private activeModal: NgbActiveModal, private service: InventarioService,private _builder:FormBuilder) {
    this.inventarioForm=this._builder.group({
      nombreInventario:['',Validators.compose([Validators.required,Validators.maxLength(250)])],
    });
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  guardar() {
    if (this.esNuevo){
      var y = +this.item.codInventario;
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
