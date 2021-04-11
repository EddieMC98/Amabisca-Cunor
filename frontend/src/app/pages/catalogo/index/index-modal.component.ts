import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductoService } from "../../../@core/data/producto.service";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";

@Component({
  selector: "ngx-index-modal",
  templateUrl: "./index-modal.component.html",
  styleUrls: ["./index-modal.component.scss"],
})
export class IndexModalComponent implements OnInit {
  public item = new ProductoAux();
  modalHeader: string;
  public esNuevo: Boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private service: ProductoService
  ) {}

  ngOnInit() {}

  guardar() {
    console.log("Se agrega a carrito");
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
