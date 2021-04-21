import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbSearchService,
  NbToastrService,
} from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import {
  BodyOutputType,
  Toast,
  ToasterConfig,
  ToasterService,
} from "angular2-toaster";
import { IndexService } from "../../../@core/data/index.service";
import { ProductoService } from "../../../@core/data/producto.service";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";
import { IndexModalComponent } from "./index-modal.component";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { UnidadMedidaService } from "../../../@core/data/unidad-medida.service";
import { MarcaService } from "../../../@core/data/marca.service";
import { CategoriaService } from "../../../@core/data/categoria.service";
import { UnidadMedida } from "../../../@core/modelos/unidad-medida";
import { Marca } from "../../../@core/modelos/marca";
import { Categoria } from "../../../@core/modelos/categoria";

@Component({
  selector: "ngx-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  private items: ProductoAux[];
  public item = new ProductoAux();
  public id_producto: number;
  selectedItem = "1";

  //Modal
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

  //Variables Paginacion
  totalLength: any;
  page: number = 1;
  pageNumber: number = 4;
  nombreProd: string;
  private lstCategoria: Categoria[];
  codCat: string = null;
  private lstMarca: Marca[];
  codMar: string = null;
  private lstUnidadMedida: UnidadMedida[];
  codUM: string = null;

  constructor(
    private service: IndexService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private CatService: CategoriaService,
    private MarcService: MarcaService,
    private UniMed: UnidadMedidaService,
    private router: Router,
    private searchService: NbSearchService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.getAllPorNombre(data.term);
    });
  }

  ngOnInit() {
    this.getAll();
    this.getFiltros();
  }

  getAll() {
    this.service.verProductos().subscribe(
      (items) => {
        this.totalLength = items.length;
        //console.log(items);

        this.items = items;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllPorNombre(nombre: any) {
    console.log(nombre.length);
    this.nombreProd = nombre;
    if (this.nombreProd.length > 0) {
      this.service.verProductosPorNombre(this.nombreProd).subscribe(
        (items) => {
          this.totalLength = items.length;
          //console.log(items);
          this.items = items;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.getAll();
    }
  }

  verDetalles(id: number) {}
  detProd(id: number) {
    // console.log(id);

    this.modalRef = this.modalService.open(IndexModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.verProducto(id).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Detalle de Producto";
        this.modalRef.componentInstance.item = data[0];
        this.modalRef.componentInstance.esNuevo = false;
        this.modalRef.result.then(
          (data) => {
            //this.showToast("info", "Detalle Registro", data);
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

  addProducto(producto: ProductoAux) {
    let productos = [];
    let bandera: boolean = true;
    if (localStorage.getItem("Productos")) {
      productos = JSON.parse(localStorage.getItem("Productos"));
      bandera = false;
      //IF PARA COMPROBAR SI YA EXISTE UN PRODUCTO
      productos.forEach((element) => {
        if (element.codProducto == producto.codProducto) {
          this.showToast(
            NbToastStatus.WARNING,
            "Advertencia",
            "¡Este producto  ya esta en el carrito de compras!"
          );
          bandera = true;
        }
      });

      if (bandera) {
      } else {
        productos = [producto, ...productos];
        this.showToast(
          NbToastStatus.SUCCESS,
          "Registro",
          "¡Se ha añadido el producto al carrito de compras!"
        );
      }
    } else {
      productos = [producto];
      this.showToast(
        NbToastStatus.SUCCESS,
        "Registro",
        "¡Se ha añadido el producto al carrito de compras!"
      );
    }
    localStorage.setItem("Productos", JSON.stringify(productos));
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

  //Métodos Paginacion
  inc() {
    if (this.pageNumber < this.totalLength) {
      this.pageNumber += 4;
    }
  }

  dec() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 4;
    }
  }

  //COMBOBOX PARA FILTROS
  getFiltros() {
    this.CatService.getCategorias().subscribe(
      (items) => {
        this.lstCategoria = items;
      },
      (err) => {
        console.log(err);
      }
    );

    this.MarcService.findAll().subscribe(
      (items) => {
        this.lstMarca = items;
      },
      (err) => {
        console.log(err);
      }
    );

    this.UniMed.getUnidades().subscribe(
      (items) => {
        this.lstUnidadMedida = items;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  filtrar() {
    this.service
      .verProductoFiltros(this.codCat, this.codMar, this.codUM)
      .subscribe(
        (items) => {
          this.items = items;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
