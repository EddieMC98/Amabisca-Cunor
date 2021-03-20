import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Cambiar contraseña',link: 'home', }, { title: 'Cerrar Sesión', link:'/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        
        if (token) {
          var usr = this.parseJwt(token.getValue());
          this.user = { name: usr.sub, picture: 'assets/images/default.png' };
        }

     });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  
  parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
