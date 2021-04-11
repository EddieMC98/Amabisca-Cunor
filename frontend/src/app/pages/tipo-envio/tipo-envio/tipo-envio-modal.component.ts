import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TipoEnvio } from "../../../@core/modelos/tipoenvio";
import { TipoEnvioService } from "../../../@core/data/tipo-envio.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "ngx-tipo-envio-modal",
  templateUrl: "./tipo-envio-modal.component.html",
  styleUrls: ["./tipo-envio-modal.component.scss"],
})
export class TipoEnvioModalComponent implements OnInit {
  public item = new TipoEnvio();
  modalHeader: string;
  public esNuevo: Boolean = false;
  tipoenvioForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private service: TipoEnvioService,
    private _builder: FormBuilder
  ) {
    this.tipoenvioForm=this._builder.group({
      nombreTipoEnvio:['',Validators.compose([Validators.required,Validators.maxLength(100)])],
      costoEnvio:['',Validators.compose([Validators.required])],
    });


  }
  ngOnInit() {}

  guardar() {
    var z: number = +this.item.costoEnvio;
    this.item.costoEnvio = z;
    if (this.esNuevo) {
      this.service.guardar(this.item).subscribe(
        (data) => {
          this.activeModal.close("Registro guardado exitósamente");
        },
        (error) => {
          this.activeModal.dismiss(error);
        }
      );
    } else {
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
