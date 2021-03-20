import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">Desarrollado por <b><a href="https://pensotec.com" target="_blank">PensoTec</a></b></span>
  `,
})
export class FooterComponent {
}
