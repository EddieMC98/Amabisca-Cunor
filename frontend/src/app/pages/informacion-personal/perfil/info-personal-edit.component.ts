import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APPCONFIG } from '../../../@core/constantes.module';
import { InfoPersonalService } from '../../../@core/data/info-personal.service';
import { Cliente } from '../../../@core/modelos/cliente';
import { InfoPersonal } from '../../../@core/modelos/info-personal';
import { Usuario } from '../../../@core/modelos/usuario';
import { InformacionPersonalComponent } from '../informacion-personal.component';

@Component({
  selector: "ngx-info-personal-edit",
  templateUrl: "./info-personal-edit.component.html",
  styleUrls: ["./info-personal-edit.component.scss"],
})
export class InfoPersonalEditComponent implements OnInit {
  //Variables para mostrar images
  imagenUrl: string = "/assets/images/image-not-found.png";
  fileToUpload: File = null;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  url = APPCONFIG.BASE_URL_IMG + "";
  codUsuario: number;
  public item = new InfoPersonal();
  public cliente = new Cliente();
  public bandera: Boolean;
  bandera_aux: number;
  editarInfoForm: FormGroup;

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
    private activeModal: NgbActiveModal,
    private service: InfoPersonalService,
    private toastrService: NbToastrService,
    private _builder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    //this.bandera = false;
    //this.getInfo();
  }

  getInfo() {
    // this.service.getInfo(this.codUsuario).subscribe(
    //   (items) => {
    //     if (items[0]) {
    //       this.bandera = true;
    //       this.item = items[0];
    //       this.prueba();
    //     } else {
    //       this.bandera = false;
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // this.prueba();
  }
  prueba() {
    if (this.bandera) {
      console.log("Works");
    }
    this.postInfoPersonal();
  }
  postInfoPersonal() {
    if (this.bandera == false) {
      this.service.addInfoPersonal(this.item).subscribe(
        (items) => {
          this.cliente.codUsuario = this.codUsuario;
          this.cliente.codInformacionPersonal = items.codInformacionPersonal;
          this.activeModal.close("Registro actualizado exitósamente");
          this.postCliente();
          this.showToast(NbToastStatus.PRIMARY, "Registro", "Registro Exitoso");

        },
        (err) => {
          console.log(err);
        }
      );

    } else {
      this.service.updateInfoPersonal(this.item).subscribe(
        (items) => {
          this.activeModal.close("Registro actualizado exitósamente");
          this.showToast(NbToastStatus.PRIMARY, "Registro", "Registro Exitoso");
        },
        (err) => {
          console.log(err);
        }
      );
      console.log("es viejo");
    }
  }

  postCliente() {
    this.service.addCliente(this.cliente).subscribe(
      (items) => {
        console.log("Cliente creado");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Modal
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

  closeModal() {
    this.showToast(
      NbToastStatus.DANGER,
      "Actualización",
      "Actualización Cancelada"
    );
    this.activeModal.dismiss();
  }

  public uploadFile = (files) => {
    console.clear();
    console.log("Entra aqui ESPAÑ");
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
    var replace1 = todaysDataTime.split(" ").join("");
    this.item.imagenPerfil = replace1 + fileToUpload.name + "";
    formData.append("imagenPerfil", fileToUpload, replace1 + fileToUpload.name);
    this.http
      .post(this.url+"api/producto/Upload", formData, {
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
