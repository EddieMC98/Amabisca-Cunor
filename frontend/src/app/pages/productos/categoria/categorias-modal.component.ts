import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria} from '../../../@core/modelos/categoria';
import { CategoriaService } from '../../../@core/data/categoria.service';

@Component({
  selector: 'ngx-modalcategorias',
  templateUrl: './categorias-modal.component.html',
})
export class CategoriasModalComponent {
  public item = new Categoria();
  modalHeader: string;
  public esNuevo: Boolean = false;

  constructor(private activeModal: NgbActiveModal, private service: CategoriaService) { }

  guardar() {

    var y: number = +this.item.estadoActivo;
    this.item.estadoActivo=y;
    if (this.esNuevo){
     this.service.addCategoria(this.item).subscribe(
              data => {
                this.activeModal.close("Registro guardado exitósamente");
              },
              error => {
                this.activeModal.dismiss(error);
              }
      );
    }else{
      this.service.updateCategoria(this.item).subscribe(
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
