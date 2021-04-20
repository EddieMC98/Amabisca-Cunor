import { Component, OnInit } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms/src/directives";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetallePedido } from "../../../@core/modelos/Varios/PedidosAux";
import * as html2pdf from "html2pdf.js";
import { Pedido } from "../../../@core/modelos/pedido";

@Component({
  selector: "ngx-index-cliente-modal",
  templateUrl: "./index-cliente-modal.component.html",
  styleUrls: ["./index-cliente-modal.component.scss"],
})
export class IndexClienteModalComponent implements OnInit {
  public item: DetallePedido[];
  modalHeader: string;
  //Empieza Configuración Toastr
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //Termina Configuración Toastr

  public nombreCliente: string;
  public montoTotal: number;
  public transaccionId: string;
  public fechaPedido: Date;
  public clienteDireccionEnvio: string;
  public tipoEnvio: string;
  public nombrePersona: string;
  public costoEnvio: number;
 
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
   
    this.item = [];
  }
  prueba() {
    console.log(this.item);
  }
  imprimir() {
    const options = {
      filename: "AMA-" + this.item[0].codPedido + ".pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 5 },
      jsPDF: { orientation: "landscape", format: "a3" },
    };

    const content: Element = document.getElementById("element-to-export");

    html2pdf().from(content).set(options).save();
  }

  closeModal() {
    this.activeModal.dismiss();
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
