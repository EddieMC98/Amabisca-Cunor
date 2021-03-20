import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Configuracion } from '../../@core/modelos/configuracion';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { APPCONFIG } from '../../@core/constantes.module';

@Component({
  selector: 'ngx-configuracion',
  styleUrls: ['./configuracion.component.scss'],
  templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent {
  public item = new Configuracion();
  private items: Configuracion[];
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  public esNuevo: Boolean = false;

  constructor(private service: ConfiguracionService, private toasterService: ToasterService) {  }

  ngOnInit() { //when component loading get all users and set the users[]
    this.getAll();
  }

  getAll() {
    this.service.findAll().subscribe(
      items => {
        this.items = items;
        this.cargarConfiguracion();
      },
      err => {
        console.log(err);
      }
 
    );
  }

  cargarConfiguracion(){
    if (typeof this.items !== 'undefined' && this.items.length > 0) {
        this.item = this.items[0];
        this.esNuevo = false;
    }else{
        this.item = new Configuracion();
        this.esNuevo = true;
    }
  }

  guardar() {
    if (this.esNuevo){
      this.service.guardar(this.item).subscribe(
              data => {
                this.showToast("info", "Guardar", "Configuración almacenada exitósamente");
              },
              error => {
                this.showToast("error", "Guardar", "No fue posible almacenar los cambios.");
              }
      );
    }else{
      this.service.actualizar(this.item).subscribe(
              data => {
                this.showToast("info", "Guardar", "Configuración almacenada exitósamente");
              },
              error => {
                this.showToast("error", "Guardar", "No fue posible almacenar los cambios.");
              }
      );
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
