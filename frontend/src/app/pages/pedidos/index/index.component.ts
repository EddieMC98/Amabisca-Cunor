import { Component, OnInit } from '@angular/core';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { FormBuilder } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { PedidoService } from '../../../@core/data/pedido.service';
import { Pedido } from '../../../@core/modelos/pedido';
import { DetalleEnvioModalComponent } from './detalle-envio-modal.component';

@Component({
  selector: "ngx-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  private items: Pedido[];
  public item = new Pedido();
  modalRef: NgbModalRef;
  //Empieza Configuración Toastr
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //Termina Configuración Toastr
  constructor(
    private service: PedidoService,
    private toastrService: NbToastrService,
    private _builder: FormBuilder,
    private modalService: NgbModal
  ) {}
  settings = {
    mode: "external",
    actions: {
      position: "right",
      add: false,
      delete: false,
      columnTitle: "Acciones",
      custom: [],
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fas fa-eye"></i>',
    },
    columns: {
      codPedido: {
        title: "ID",
        type: "number",
      },
      numeroPedido: {
        title: "Numero Pedido",
        type: "string",
      },
      montoTotal: {
        title: "Total (Q)",
        type: "number",
      },

      estadoEntrega: {
        title: "Estado",
        valuePrepareFunction: (value) => {
          return value === "PROCESO" ? "PROCESO" : "ENTREGADO";
        },
        filter: {
          type: "list",
          config: {
            selectText: "Estado",
            list: [
              { value: "PROCESO", title: "EN PROCESO" },
              { value: "ENTREGADO", title: "ENTREGADO" },
            ],
          },
        },
      },
      fechaPedido: {
        title: "Fecha",
        valuePrepareFunction: (date) => {
          var raw = date.split("-");
          var day = raw[2].split("T");
          var fecha = raw[0] + "-" + raw[1] + "-" + day[0];
          return fecha;
        },
        sortDirection: "desc",
      },
    },
  };

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getPedidos().subscribe(
      (items) => {
        items.forEach((element) => {
          element.numeroPedido = "AMA-" + element.codPedido;
        });

        this.items = items;
        this.source.load(this.items);
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }

  //Detalle registro
  editarRegistro(value) {
    this.modalRef = this.modalService.open(DetalleEnvioModalComponent, {
      windowClass: "myCustomModalClass",
      container: "nb-layout",
    });

    this.service.getDetallePedido(value.data.codPedido).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Detalle Pedido";
        this.modalRef.componentInstance.item = data;
        this.modalRef.componentInstance.nombreCliente = data[0].cliente;
        this.modalRef.componentInstance.montoTotal = data[0].montoTotal;
        this.modalRef.componentInstance.transaccionID = data[0].transaccionID;
        this.modalRef.componentInstance.fechaPedido = data[0].fechaPedido;
        this.modalRef.componentInstance.clienteDireccionEnvio =
          data[0].clienteDireccionEnvio;
        this.modalRef.componentInstance.tipoEnvio = data[0].tipoEnvio;
        this.modalRef.componentInstance.costoEnvio = data[0].costoEnvio;
        this.modalRef.componentInstance.nombrePersona = data[0].nombrePersona;
        this.modalRef.componentInstance.pedido = value.data;
        if (data[0].estadoEntrega === "PROCESO") {
          this.modalRef.componentInstance.estado = 1;
        } else {
          this.modalRef.componentInstance.estado = 0;
        }

        this.modalRef.result.then(
          (data) => {
            this.getAll();
          },
          (reason) => {
            this.getAll();
          }
        );
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }

  //Empieza método Toastr
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
  //Termina método Toastr
}
