import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToasterConfig } from "angular2-toaster";
import { InfoPersonalService } from "../../../@core/data/info-personal.service";
import { UsuarioService } from "../../../@core/data/usuarios.service";
import { InfoPersonal } from "../../../@core/modelos/info-personal";
import { Usuario } from "../../../@core/modelos/usuario";
import { InfoPersonalEditComponent } from "./info-personal-edit.component";
import { PerfilEditComponent } from "./perfil-edit.component";

@Component({
  selector: "ngx-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {
  modalRef: NgbModalRef;

  config: ToasterConfig;
  formPerfil: boolean = true;
  formEditarPerfil: boolean = false;
  codUsuario: number;
  position = "toast-top-right";
  animationType = "fade";
  timeout = 5000;
  toastsLimit = 5;
  direccionImagen : string;
  public item = new Usuario();
  constructor(
    private service: UsuarioService,
    private serviceInfo: InfoPersonalService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //when component loading get all users and set the users[]
    this.getAll();
    
      }

  getAll() {
    this.service.findByIdPerfil().subscribe(
      (items) => {
        this.item = items;
        this.codUsuario = this.item.cod_usuario;
         this.serviceInfo.getInfo(this.codUsuario).subscribe(
           (items) => {
             this.direccionImagen = items[0].imagenPerfil;
           },
           (err) => {
             console.log(err);
           }
         );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editarPerfil() {
    this.modalRef = this.modalService.open(PerfilEditComponent, {
      windowClass: "myCustomModalClass",
      container: "nb-layout",
    });

    this.service.findByIdPerfil().subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Editar Perfil";
        this.modalRef.componentInstance.item = data;
        var raw = data.fec_creacion.toString().split("-");
        var day = raw[2].split("T");
        var fecha = day[0] + "/" + raw[1] + "/" + raw[0];
        this.modalRef.componentInstance.fecha = fecha;
        this.modalRef.componentInstance.esNuevo = false;
        this.modalRef.componentInstance.direccionImagen = this.direccionImagen;
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

  editarInfoPersonal() {
    this.modalRef = this.modalService.open(InfoPersonalEditComponent, {
      windowClass: "myCustomModalClass",
      container: "nb-layout",
    });

    this.serviceInfo.getInfo(this.codUsuario).subscribe(
      (items) => {
       
        this.modalRef.componentInstance.modalHeader ="Editar Información Personal";
        this.modalRef.componentInstance.codUsuario = this.codUsuario;
        
        if (items[0]) {
          this.modalRef.componentInstance.bandera=true;
           this.direccionImagen = items[0].imagenPerfil;
          this.modalRef.componentInstance.item=items[0];
          
        } else {
         
          this.modalRef.componentInstance.bandera = false;
          this.modalRef.componentInstance.item = new InfoPersonal();
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
      (err) => {
        console.log(err);
      }
    );

    
    
  }

  
}
