import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { RolesDialogComponent} from './roles-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';
import { Menu } from '../../../@core/modelos/menu';
import { MenuService } from '../../../@core/data/menu.service';
import {ActivatedRoute} from "@angular/router";
import { MenuPermiso } from '../../../@core/modelos/menu-permiso';
import { FormGroup } from '@angular/forms';
import { Permiso } from '../../../@core/modelos/permiso';

@Component({
  selector: 'ngx-permisos',
  styleUrls: ['./permisos.component.scss'],
  templateUrl: './permisos.component.html',
})
export class PermisosComponent {
  public items: MenuPermiso[];
  modalRef: NgbModalRef;
  public codRol:number;
  public orderForm: FormGroup;
  config: ToasterConfig;
  
    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: MenuService, private modalService: NgbModal, private toasterService: ToasterService, private datePipe: DatePipe, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.getAll(params.id) );
  }

  

  ngOnInit() { 
    
  }

  getAll(codRol: number) {
    this.codRol = codRol;
    this.service.findPermisos(0,codRol).subscribe(
      items => {
        this.items = items;
      },
      err => {
        console.log(err);
      }
 
    );
  }

  onSubmit() {
    for (var n = 0; n < this.items.length; n++) {
      if (this.items[n].estado_permiso == 1){
        this.items[n].estado_permiso = 1;
      }else{
        this.items[n].estado_permiso = 0;
      }
    }

    this.service.guardar(this.items).subscribe(
      data => {
        this.showToast("info", "Guardar", "Permisos almacenados exitósamente");
      },
      error => {
        this.showToast("error", "Guardar", "No fue posible almacenar los permisos.");
      }
    );
  }
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return '';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return '';
      } else {
        return  `${reason}`;
      }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
