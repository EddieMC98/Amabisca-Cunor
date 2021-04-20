import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoCambioService } from '../../../@core/data/tipo-cambio.service';
import { Divisa } from '../../../@core/modelos/divisa';

@Component({
  selector: "ngx-index-modal",
  templateUrl: "./index-modal.component.html",
  styleUrls: ["./index-modal.component.scss"],
})
export class IndexModalComponent implements OnInit {
  public item = new Divisa();
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
    private service: TipoCambioService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {}

  guardar() {
     var y: number = +this.item.tipoCambio;
     this.item.tipoCambio = y;
    this.service.updateDivisa(this.item).subscribe(
      (data) => {
         this.showToast(
           NbToastStatus.SUCCESS,
           "ERROR",
           "¡Se ha actualizado el tipo de cambio!"
         );
         this.closeModal();
      },
      (error) => {
        this.showToast(
          NbToastStatus.DANGER,
          "ERROR",
          "¡No se ha actualizado el tipo de cambio!"
        );
        this.activeModal.dismiss(error);
      }
    );
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
