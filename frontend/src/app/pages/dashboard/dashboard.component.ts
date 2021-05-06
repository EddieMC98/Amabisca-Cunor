import { UrlResolver } from '@angular/compiler';
import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { APPCONFIG } from '../../@core/constantes.module';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  url = APPCONFIG.BASE_URL_IMG+"";
  private alive = true;


  statusCards: string;

  ngOnDestroy() {
    this.alive = false;
  }
}
