import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService,
} from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import { DireccionEnvioService } from "../../../@core/data/direccion-envio.service";
import { InfoPersonalService } from "../../../@core/data/info-personal.service";
import { UsuarioService } from "../../../@core/data/usuarios.service";
import { DireccionEnvio } from "../../../@core/modelos/direeccion-envio";
import { Producto } from "../../../@core/modelos/producto";
import { TipoEnvio } from "../../../@core/modelos/tipoenvio";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";
import { Observable } from "rxjs";
import { ListaCarrito } from "../../../@core/modelos/Varios/lista-carrito";
import { environment } from "../../../../environments/environment";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { IndexModalComponent } from "./index-modal.component";

@Component({
  selector: "ngx-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  //Listas
  public lstProducto: Array<ProductoAux> = [];
  private lstDireccionesCliente: DireccionEnvio[];
  private lstEmpresasTransp: TipoEnvio[];

  //Lista Para el carrito
  public lstCarrito = new ListaCarrito();
  public bandera_comprar: boolean;
  //

  //Esto es variables RadioButton
  options = [
    { value: "2", label: "Recoger en Tienda" },
    { value: "1", label: "Entrega a Domicilio" },
  ];
  option;

  public selectedOption: number;
  modalRef: NgbModalRef;
  //Empieza Configuración Toastr
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //Termina Configuración Toastr
  contador: number;
  fila: number;
  total: number = 0;
  precio_costo: number = 0;
  bandera: Boolean = false;
  bandera_aux: Boolean = false;
  cont: number = 0;
  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private service: DireccionEnvioService,
    private service_aux: UsuarioService,
    private service_clint: InfoPersonalService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //  this.lstCarrito.tipoEntrega.nombreTipoEnvio = "No hay metodo";
    this.comprobacionDatos();
    this.option = 1;
    this.bandera_comprar = true;
  }

  comprobacionDatos() {
    this.service_aux.findByIdPerfil().subscribe(
      (data) => {
        this.service_clint.getInfo(data.cod_usuario).subscribe(
          (res) => {
            // console.log(res[0]);
            if (res[0]) {
              this.lstCarrito.cliente = res[0];
              this.getCarritoCompras();
              this.getDirecciones();
              this.getEmpresasTransporte();
            } else {
              this.showToast(
                NbToastStatus.DANGER,
                "ERROR",
                "¡Para poder comprar debe ingresar su información personal!"
              );
              this.router.navigate(["pages/informacion-personal/perfil"]);
            }
          },
          (error) => {
            console.log(error);
          },
          () => {}
        );
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  getCarritoCompras() {
    this.lstProducto = JSON.parse(localStorage.getItem("Productos"));
    this.lstProducto.forEach((element) => {
      element.precioCosto = 1;
    });
    this.getTotal();
  }
  getTotal() {
    this.total = 0;
    this.lstProducto.forEach((element) => {
      this.total = this.total + element.precioVenta * element.precioCosto;
    });
    this.total = this.total + this.precio_costo;
  }

  eliminarProducto(id: number) {
    this.contador = 0;
    this.fila = 0;
    let productos = [];
    let bandera: boolean = true;
    if (localStorage.getItem("Productos")) {
      productos = JSON.parse(localStorage.getItem("Productos"));
      bandera = false;
      //IF PARA COMPROBAR SI YA EXISTE UN PRODUCTO
      productos.forEach((element) => {
        if (element.codProducto == id) {
          bandera = true;
          this.fila = this.contador;
        }
        this.contador = this.contador + 1;
      });

      if (bandera) {
        this.showToast(
          NbToastStatus.DANGER,
          "Eliminado",
          "¡Se ha eliminado el producto del carrito de compras!"
        );
        productos.splice(this.fila, 1);
        localStorage.setItem("Productos", JSON.stringify(productos));
      } else {
      }
      this.contador = 0;
    }
    //window.location.reload();
    this.getCarritoCompras();
  }

  regresarCatalogo() {
    this.router.navigate(["pages/catalogo/index"]);
  }

  getDirecciones() {
    this.service_aux.findByIdPerfil().subscribe(
      (data) => {
        this.service_clint.getCliente(data.cod_usuario).subscribe(
          (data2) => {
            this.service.getDirecciones(data2[0].codCliente).subscribe(
              (items) => {
                //  console.log(items);
                if (items.length != 0) {
                  this.lstDireccionesCliente = items;
                } else {
                  this.cont = 1;
                  this.showToast(
                    NbToastStatus.DANGER,
                    "CUIDADO",
                    "¡Para poder solicitar pedido a domicilio debe agrergar direcciones de envío!"
                  );
                }
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (error) => {
            //console.log(error);
          },
          () => {}
        );
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }

  //Comprar
  comprar() {
    this.bandera_comprar = true;
    
    if (this.option == undefined) {
      this.bandera_comprar = false;
      this.showToast(
        NbToastStatus.DANGER,
        "ERROR",
        "¡Para poder comprar debe seleccionar su método de entrega!"
      );
    } else {
      console.log("Aqui empieza");
      console.log(this.lstCarrito);
      console.log("Aqui termina");
      if (
        this.lstCarrito.direccionEnvio.codDireccionEnvio == 0 &&
        this.lstCarrito.tipoEntrega.nombreTipoEnvio != "Tienda"
      ) {
        this.bandera_comprar = false;
        this.showToast(
          NbToastStatus.DANGER,
          "ERROR",
          "¡Para poder comprar debe seleccionar una dirección de envío!"
        );
      }
      if (this.lstCarrito.tipoEntrega.nombreTipoEnvio == "No hay metodo") {
        this.bandera_comprar = false;
        this.showToast(
          NbToastStatus.DANGER,
          "ERROR",
          "¡Para poder comprar debe seleccionar una empresa de transporte!"
        );
      }
      if (this.lstCarrito.tipoEntrega.nombreTipoEnvio == "Tienda") {
        this.bandera_comprar = true;
      }
    }

    if (this.bandera_comprar) {
      this.lstCarrito.lstProducto = this.lstProducto;
      this.lstCarrito.total=this.total;
      this.showToast(NbToastStatus.SUCCESS, "COMPRAR", "¡SI PUEDE COMPRAR!");
      this.openModal();
    } else {
      console.log("NO SE PUEDE COMPRAR");
    }
  }
  //
  //Metodo para modal
  openModal() {
    this.modalRef = this.modalService.open(IndexModalComponent, {
      windowClass: "myCustomModalClass",
      container: "nb-layout",
    });

    
        this.modalRef.componentInstance.modalHeader ="Pedido";
        this.modalRef.componentInstance.item = this.lstCarrito;
        this.modalRef.componentInstance.lstProducto= this.lstCarrito.lstProducto;

        
        this.modalRef.result.then(
          (data) => {
            //this.getAll();
          },
          (reason) => {
            //this.getAll();
          }
        );
      
  }
  //
  //Método para ver las empresas de envío de paquetería
  getEmpresasTransporte() {
    this.service.getEmpresasTransporte().subscribe(
      (items) => {
        // console.log("Esto son las direcciones:");
        // console.log(items);
        this.lstEmpresasTransp = items;
      },
      (err) => {
        console.log(err);
      }
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

  actualizar() {
    this.getTotal();
  }

  getDireccionCliente(event: any) {
    this.lstCarrito.direccionEnvio = new DireccionEnvio();
    this.lstDireccionesCliente.forEach((element) => {
      if (element.codDireccionEnvio == event.target.value) {
        this.lstCarrito.direccionEnvio = element;
      }
    });
  }
  getPrecioCostoTransporte(event: any) {
    var x;
    x = +event.target.value;
    if (x == 0) {
      this.precio_costo = 0;
      this.getTotal();
      this.bandera = false;
      this.lstCarrito.tipoEntrega.nombreTipoEnvio = "No hay metodo";
      //  console.log(this.lstCarrito.tipoEntrega);
    } else {
      this.service.getEmpresasTransporte().subscribe(
        (items) => {
          items.forEach((element) => {
            if (element.codTipoEnvio == x) {
              this.lstCarrito.tipoEntrega = element;
              this.precio_costo = element.costoEnvio;
              this.getTotal();
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getRecogerTienda(tipo: number) {
    this.lstCarrito.direccionEnvio = new DireccionEnvio();
    if (tipo == 1) {
      this.precio_costo = 0;
      this.getTotal();
      this.lstCarrito.tipoEntrega = new TipoEnvio();
      this.lstCarrito.tipoEntrega.nombreTipoEnvio = "Tienda";
      this.lstCarrito.tipoEntrega.costoEnvio = 0;
    } else if (tipo == 2) {
      this.lstCarrito.tipoEntrega.nombreTipoEnvio = "No hay metodo";
    }
  }
}
