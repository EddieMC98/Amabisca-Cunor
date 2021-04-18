import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoPersonalService } from '../../../@core/data/info-personal.service';
import { UsuarioService } from '../../../@core/data/usuarios.service';
import { Usuario } from '../../../@core/modelos/usuario';

@Component({
  selector: "ngx-perfil-edit",
  templateUrl: "./perfil-edit.component.html",
  styleUrls: ["./perfil-edit.component.scss"],
})
export class PerfilEditComponent implements OnInit {
  public item = new Usuario();
  modalHeader: string;
  public esNuevo: Boolean = false;
  fecha: string;
  editarPerfilForm: FormGroup;
  direccionImagen:string;
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
    private service: UsuarioService,
    private toastrService: NbToastrService,
    private infoService:InfoPersonalService,
    private _builder: FormBuilder
  ) {
    this.editarPerfilForm = this._builder.group({
      nombre_completo: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
    });
  }

  ngOnInit() {
    //when component loading get all users and set the users[]
  }

  closeModal() {
    this.showToast(
      NbToastStatus.INFO,
      "Actualización",
      "Actualización Cancelada"
    );
    this.activeModal.dismiss();
  }

  guardar() {
    if (this.esNuevo) {
    } else {
      var z = +this.item.cod_usuario;
      this.item.cod_usuario = z;
      this.service.actualizar(this.item).subscribe(
        (data) => {
          this.activeModal.close("Registro actualizado exitósamente");
          this.showToast(NbToastStatus.PRIMARY, "Registro", "Registro Exitoso");
        },
        (error) => {
          this.showToast(NbToastStatus.DANGER, "Error", "Algo ha salido mal");
          this.activeModal.dismiss(error);
        }
      );
    }
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
