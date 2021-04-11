import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Marca } from "../../../@core/modelos/marca";
import { MarcaService } from "../../../@core/data/marca.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "ngx-marca-modal",
  templateUrl: "./marca-modal.component.html",
  styleUrls: ["./marca-modal.component.scss"],
})
export class MarcaModalComponent implements OnInit {
  public item = new Marca();
  modalHeader: string;
  public esNuevo: Boolean = false;
  marcaForm:FormGroup;
  //CodPais:number;

  constructor(private activeModal: NgbActiveModal, private service: MarcaService,private _builder:FormBuilder) {
    this.marcaForm=this._builder.group({
      nombreMarca:['',Validators.compose([Validators.required,Validators.maxLength(100)])],
    });

   }

  ngOnInit() {}
  guardar() {
    if (this.esNuevo) {
      var z = +this.item.estadoActivo;

      this.item.estadoActivo = z;

      this.service.guardar(this.item).subscribe(
        (data) => {
          this.activeModal.close("Registro guardado exitósamente");
        },
        (error) => {
          this.activeModal.dismiss(error);
        }
      );
    } else {
      var z = +this.item.estadoActivo;
      this.item.estadoActivo = z;
      this.service.actualizar(this.item).subscribe(
        (data) => {
          this.activeModal.close("Registro actualizado exitósamente");
        },
        (error) => {
          this.activeModal.dismiss(error);
        }
      );
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
