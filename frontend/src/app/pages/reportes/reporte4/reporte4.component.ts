import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { APPCONFIG } from '../../../@core/constantes.module';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-reporte4',
  styleUrls: ['./reporte4.component.scss'],
  templateUrl: './reporte4.component.html',
})
export class Reporte4Component {
  frameName = 'foo';
  public frameUrl = APPCONFIG.BASE_URL + 'reportes/rptFuncionamiento';
  public fec_ini;
  public fec_fin;
  public formato = 1;
  private fechas = "";
  constructor(){ 

  }
  

  onReporte(){
    this.fechas = this.fec_ini.year + "-" + (this.fec_ini.month) + "-" + this.fec_ini.day;
    this.fechas += "/" + this.fec_fin.year + "-" + (this.fec_fin.month) + "-" + this.fec_fin.day;
    window.open(this.frameUrl + "/" + this.fechas + "/" + this.formato, "_blank");
  }
}
