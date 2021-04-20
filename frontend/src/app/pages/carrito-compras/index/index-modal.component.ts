import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DomAdapter } from "@angular/platform-browser/src/dom/dom_adapter";
import { Router } from "@angular/router";
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { DireccionEnvioService } from "../../../@core/data/direccion-envio.service";
import { InfoPersonalService } from "../../../@core/data/info-personal.service";
import { PedidoService } from "../../../@core/data/pedido.service";
import { TipoCambioService } from "../../../@core/data/tipo-cambio.service";
import { TransaccionService } from "../../../@core/data/transaccion.service";
import { UsuarioService } from "../../../@core/data/usuarios.service";
import { PedidoAux } from "../../../@core/modelos/pedido-aux";
import { Producto } from "../../../@core/modelos/producto";
import { Transaccion } from "../../../@core/modelos/transaccion";
import { ListaCarrito } from "../../../@core/modelos/Varios/lista-carrito";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";
import { PaymentModalComponent } from "./payment-modal.component";

@Component({
  selector: "ngx-index-modal",
  templateUrl: "./index-modal.component.html",
  styleUrls: ["./index-modal.component.scss"],
})
export class IndexModalComponent implements OnInit {
  public item: ListaCarrito;
  public lstProducto: ProductoAux[];
  modalRef: NgbModalRef;
  public paypalConfig?: IPayPalConfig;
  public tipoCambio_: number = 0;
  public totalDolares: number = 0;
  public itemAux: PedidoAux;
  public lstProducto2: Array<ProductoAux> = [];
  public codCliente: number = 0;
  public codDireccionEnvio: number = 0;
  public codClienteDireccionEnvio: number = 0;
  public itemTrans: Transaccion;

  //Empieza Configuración Toastr
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //Termina Configuración Toastr
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private serviceDivisa: TipoCambioService,
    private servicePedido: PedidoService,
    private service_aux: UsuarioService,
    private service_clint: InfoPersonalService,
    private serviceDE: DireccionEnvioService,
    private toastrService: NbToastrService,
    private router: Router,
    private tranService:TransaccionService,
  ) {}

  ngOnInit() {
    this.itemTrans = new Transaccion();
    this.initConfig();
  }

  guardar() {
    console.log(this.item);
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  payment() {
    this.realizarPedido();
    this.closeModal();
    this.showToast(
      NbToastStatus.SUCCESS,
      "PAGO COMPLETADO",
      "¡Gracias por su compra!"
    );
    
    
    //tranService
    localStorage.removeItem("Productos");
    this.router.navigate(["pages/catalogo/index"]);
  }

  private initConfig(): void {
    this.paypalConfig = {
      currency: "USD",

      clientId:
        "ASEUeKAx3DU5jTrbbOvrdgfozTkpggOy4FyS9mbj-cNTCfQy8nWELcRQNNzlCU4xaZ6gqZPloGwFr6nv",
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          locale: "es_GT",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: this.totalDolares + "",
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: this.totalDolares + "",
                  },
                },
              },
              items: [
                {
                  name: "Compra de Productos en Amabisca",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "USD",
                    value: this.totalDolares + "",
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: "true",
      },
      style: {
        label: "paypal",
        layout: "vertical",
        size: "small",
        color: "blue",
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },

      onClientAuthorization: (data) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        this.itemTrans.transaccionId = data.id;
        this.payment();
      },
      onCancel: (data, actions) => {
        this.showToast(
          NbToastStatus.WARNING,
          "PAGO CANCELADO",
          "¡AH CANCELADO EL PAGO!"
        );
        console.log("OnCancel", data, actions);
      },
      onError: (err) => {
        console.log("OnError", err);
        this.showToast(
          NbToastStatus.DANGER,
          "PAGO NO COMPLETADO",
          "¡Ah ocurrido un error!"
        );
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      },
    };
  }

  realizarPedido() {
    this.itemAux.montoTotal = this.item.total;
    this.itemAux.codTipoEnvio = this.item.tipoEntrega.codTipoEnvio;
    this.itemAux.codCliente = this.codCliente;
    this.itemAux.codClienteDireccionEnvio = this.codClienteDireccionEnvio;

    this.servicePedido.addPedido(this.itemAux).subscribe(
      (data) => {
        var y =+ data;
        this.itemTrans.codPedido=y;
        this.tranService.addTransaction(this.itemTrans).subscribe(
          (data2) => {
            console.log(data2);
          },
          (error) => {
            console.log(error);
          },
          () => {}
        );
       
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
