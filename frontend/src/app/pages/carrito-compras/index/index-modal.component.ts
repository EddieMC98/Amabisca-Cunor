import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../../@core/modelos/producto';
import { ListaCarrito } from '../../../@core/modelos/Varios/lista-carrito';
import { ProductoAux } from '../../../@core/modelos/Varios/producto-aux';
import { PaymentModalComponent } from './payment-modal.component';

@Component({
  selector: "ngx-index-modal",
  templateUrl: "./index-modal.component.html",
  styleUrls: ["./index-modal.component.scss"],
})
export class IndexModalComponent implements OnInit {
  public item: ListaCarrito;
  public lstProducto: ProductoAux[];
  modalRef: NgbModalRef;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {}

  guardar() {
    console.log(this.item);
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  payment() {
    this.closeModal();
    this.modalRef = this.modalService.open(PaymentModalComponent, {
      windowClass: "cardModal",
      container: "nb-layout",
    });
    this.modalRef.componentInstance.modalHeader = "Pago";
    this.modalRef.result.then(
      (data) => {
        //this.getAll();
      },
      (reason) => {
        //this.getAll();
      }
    );
  }
}
