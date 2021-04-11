import { Component, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Producto } from "../../../@core/modelos/producto";
import { ProductoService } from "../../../@core/data/producto.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Categoria } from "../../../@core/modelos/categoria";
import { CategoriaService } from "../../../@core/data/categoria.service";
import { MarcaService } from "../../../@core/data/marca.service";
import { UnidadMedidaService } from "../../../@core/data/unidad-medida.service";
import { Marca } from "../../../@core/modelos/marca";
import { UnidadMedida } from "../../../@core/modelos/unidad-medida";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import { EventEmitter } from "events";
import { formatDate } from "@angular/common";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "ngx-producto-modal",
  templateUrl: "./producto-modal.component.html",
  styleUrls: ["./producto-modal.component.scss"],
})
export class ProductoModalComponent implements OnInit {
  //Video 1
  imagenUrl: string = "/assets/images/image-not-found.png";
  fileToUpload: File = null;

  //Video 2
  public archivo: Producto;
  public archivosServer: Producto;
  public lastPK: number;

  //Vídeo 3
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  //Ya estaban
  error: string;
  public item = new Producto();
  modalHeader: string;
  public esNuevo: Boolean = false;
  productForm: FormGroup;
  private lstCategoria: Categoria[];
  codCat: number;
  private lstMarca: Marca[];
  codMar: number;
  private lstUnidadMedida: UnidadMedida[];
  codUM: number;
  //CodPais:number;
  pv: number;
  pc: number;
  selectedFile: File;

  constructor(
    private activeModal: NgbActiveModal,
    private service: ProductoService,
    private CatService: CategoriaService,
    private MarcService: MarcaService,
    private UniMed: UnidadMedidaService,
    private _builder: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this._builder.group({
      nombreProducto: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      codigoProducto: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      precioCosto: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+(.[0-9][0-9]?)?"),
        ]),
      ],
      precioVenta: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+(.[0-9][0-9]?)?"),
        ]),
      ],
      detalleProducto: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(256)]),
      ],
      imagenProducto: ["", Validators.compose([Validators.required])],
    });

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

  ngOnInit() {
    // this.productForm = this._builder.group({
    //   imagenProducto: ['']
    // });
  }

  guardar() {
    if (this.esNuevo) {
      var z = +this.item.estadoActivo;
      this.item.estadoActivo = z;

      this.codCat = +this.item.codCategoria;
      this.item.codCategoria = this.codCat;

      this.codUM = +this.item.codUnidadMedida;
      this.item.codUnidadMedida = this.codUM;

      this.codMar = +this.item.codMarca;
      this.item.codMarca = this.codMar;

      this.pv = +this.item.precioVenta;
      this.item.precioVenta = this.pv;

      this.pc = +this.item.precioCosto;
      this.item.precioCosto = this.pc;

      this.service.guardar(this.item).subscribe(
        (data) => {
          this.activeModal.close("Registro guardado exitósamente");
        },
        (error) => {
          this.activeModal.dismiss(error);
        }
      );
    } else {
      var z = +this.item.estadoActivo;
      this.item.estadoActivo = z;

      this.codCat = +this.item.codCategoria;
      this.item.codCategoria = this.codCat;

      this.codUM = +this.item.codUnidadMedida;
      this.item.codUnidadMedida = this.codUM;

      this.codMar = +this.item.codMarca;
      this.item.codMarca = this.codMar;

      this.item.imagenProducto = this.productForm.get("imagenProducto").value;

      this.pv = +this.item.precioVenta;
      this.item.precioVenta = this.pv;

      this.pc = +this.item.precioCosto;
      this.item.precioCosto = this.pc;

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

  public uploadFile = (files) => {
    if (files.length === 0) return;

    let fileToUpload = <File>files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagenUrl = event.target.result;
    };
    reader.readAsDataURL(fileToUpload);
    const formData = new FormData();
    var today = new Date();
    var todaysDataTime = formatDate(
      today,
      "dd-MM-yyyy hh-mm-ss a",
      "en-US",
      "+0530"
    );
    var replace1 = todaysDataTime.split(' ').join('');
    this.item.imagenProducto = replace1 + fileToUpload.name + "";
    formData.append(
      "imagenProducto",
      fileToUpload,
      replace1 + fileToUpload.name
    );
    console.log("Entra aqui x3");
    this.http
      .post("http://localhost:5000/api/producto/Upload", formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = event.body.toString();
          this.onUploadFinished.emit(event.body + "");
        }
      });
  };
}
