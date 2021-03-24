import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Marca } from "../../../@core/modelos/marca";
import { MarcaService } from "../../../@core/data/marca.service";
import { NumberCardModule } from "@swimlane/ngx-charts";

@Component({
  selector: "ngx-marca-modal",
  templateUrl: "./marca-modal.component.html",
  styleUrls: ["./marca-modal.component.scss"],
})
export class MarcaModalComponent implements OnInit {
  public item = new Marca();
  modalHeader: string;
  public esNuevo: Boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private service: MarcaService
  ) {}
  ngOnInit() {}
  guardar() {
    var z: number = +this.item.estadoActivo;
    this.item.estadoActivo = z;
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
