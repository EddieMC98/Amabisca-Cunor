import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberCardComponent } from '@swimlane/ngx-charts';
import { PedidoService } from '../../../@core/data/pedido.service';
import { Pedido } from '../../../@core/modelos/pedido';
import { DetallePedido } from '../../../@core/modelos/Varios/PedidosAux';
import * as html2pdf from "html2pdf.js";

@Component({
  selector: "ngx-detalle-envio-modal",
  templateUrl: "./detalle-envio-modal.component.html",
  styleUrls: ["./detalle-envio-modal.component.scss"],
})
export class DetalleEnvioModalComponent implements OnInit {
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
  public transaccionID: string;
  public fechaPedido: Date;
  public clienteDireccionEnvio: string;
  public tipoEnvio: string;
  public nombrePersona: string;
  public costoEnvio: number;
  public estado: number;
  public pedido: Pedido;
  public nit:string;
  public cui:string;
  
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private service: PedidoService
  ) {}

  ngOnInit() {
    this.pedido = new Pedido();
    this.item = [];
  }
  prueba() {
    console.log(this.item);
  }
  confirmarPedido() {
    this.pedido.estadoEntrega = "ENTREGADO";
    console.log(this.pedido);

    this.service.updatePedido(this.pedido).subscribe(
      (data) => {
        this.showToast(NbToastStatus.SUCCESS, "ENTREGA", "¡PEDIDO ENTREGADO!");
        console.log(data);
        this.closeModal();
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }
  imprimir() {
     const options = {
       filename:"AMA-"+this.pedido.codPedido+".pdf",
       image: { type: "jpeg", quality: 1 },
       html2canvas: { scale: 5 },
       jsPDF: { orientation: "landscape" , format:'a3' },
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
