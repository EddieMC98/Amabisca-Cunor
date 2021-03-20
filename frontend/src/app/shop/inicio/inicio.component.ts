import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-inicio',
  styleUrls: ['./inicio.component.scss'],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnDestroy {

  private alive = true;

  
  statusCards: string;

  ngOnDestroy() {
    this.alive = false;
  }
}
