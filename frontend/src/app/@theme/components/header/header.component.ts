import { Component, Input, OnInit } from '@angular/core';

import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs-compat';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  private destroy$: Subject<void> = new Subject<void>();
  themes = [
    {
      value: 'default',
      name: 'Modo Día',
    },

    {
      value: 'cosmic',
      name: 'Nocturno',
    },
    {
      value: 'corporate',
      name: 'Normal',
    },
  ];

  currentTheme = 'cosmic';

  userMenu = [{ title: 'Cambiar contraseña', link: 'home', }, { title: 'Cerrar Sesión', link: '/auth/logout' }];

  constructor(

    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;



    const { xl } = this.breakpointService.getBreakpointsMap();


    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token) {
          var usr = this.parseJwt(token.getValue());
          this.user = { name: usr.sub, picture: 'assets/images/default.png' };
        }

      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
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

  parseJwt = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
