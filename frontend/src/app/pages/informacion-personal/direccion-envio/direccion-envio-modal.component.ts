import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccionEnvioService } from '../../../@core/data/direccion-envio.service';
import { InfoPersonalService } from '../../../@core/data/info-personal.service';
import { Cliente } from '../../../@core/modelos/cliente';
import { DireccionClienteEnvio } from '../../../@core/modelos/direccion-cliente-envio';
import { DireccionEnvio } from '../../../@core/modelos/direeccion-envio';
import { InfoPersonal } from '../../../@core/modelos/info-personal';

@Component({
  selector: "ngx-direccion-envio-modal",
  templateUrl: "./direccion-envio-modal.component.html",
  styleUrls: ["./direccion-envio-modal.component.scss"],
})
export class DireccionEnvioModalComponent implements OnInit {
  public item = new DireccionEnvio();
  modalHeader: string;
  public esNuevo: Boolean = false;
  public codUsuario:number;
  codCliente:number;
  public cliente = new DireccionClienteEnvio();
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
    private service: DireccionEnvioService,
    private toastrService: NbToastrService,
    private service_aux: InfoPersonalService,
  ) {}
  ngOnInit() {}

  guardar() {
    
    if (this.esNuevo) {
      this.service.addDireccionEnvio(this.item).subscribe(
        (data) => {
           this.showToast(
             NbToastStatus.SUCCESS,
             "Registro",
             "¡Se ha registrado la dirección de envío!"
           );
          
           
           this.cliente.codDireccionEnvio= data.codDireccionEnvio;
           this.cliente.estadoActivo=1;
           this.cliente.codCliente=this.codCliente;
           
           this.service.addClienteDireccionEnvio(this.cliente).subscribe(
        (data) => {
          this.activeModal.close("Registro guardado exitósamente");
          console.log("Direccion Cliente Envio creada");

        },
        (error) => {
          this.activeModal.dismiss(error);
        }
      );

        },
        (error) => {
          this.showToast(
            NbToastStatus.DANGER,
            "ERROR",
            "¡No se ha registrado la dirección de envío!"
          );
          this.activeModal.dismiss(error);
        }
      );
      
    } else {
      this.service.updateDireccionEnvio(this.item).subscribe(
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
