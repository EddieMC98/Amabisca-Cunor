import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  toReplace = ["Ã¡", "Ã¢", "Ã£", "Ã¤", "Ã¥", "Ã¦", "Ã§", "Ã¨", "Ã©", "Ãª", "Ã«", "Ã¬", "Ã­", "Ã®", "Ã¯", "Ã°", "Ã±", "Ã²", "Ã³", "Ã´", "Ãµ", "Ã¶", "Ã·", "Ã¸", "Ã¹", "Ãº", "Ã»", "Ã¼", "Ã½", "Ã¾", "Ã¿"];
  replaceWit= ["á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

  constructor(private authService: NbAuthService) {

  }

  ngOnInit() {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token) {
        var usr = this.parseJwt(token.getValue());
        var   menus = [];
        var inicio =  {
          title: 'Inicio',
          icon: 'nb-e-commerce',
          link: '/pages/dashboard',
          home: true,
        };
        menus.push(inicio);


        var objMenu = JSON.parse(usr.menus);
        console.log(objMenu);
        for (var n = 0; n < objMenu.length; n++) {
          var childrens = [];
          for (var x=0; x<objMenu[n].permisos.length;x++){
            var children = {
              title : this.doReplace(objMenu[n].permisos[x].nombre),
              link : objMenu[n].permisos[x].enlace
            }
            childrens.push(children);
          }
          var NbMenuItem = {
            title : this.doReplace(objMenu[n].nombre),
            icon : objMenu[n].icono,
            link : objMenu[n].enlace,
            children : childrens
          }
          menus.push(NbMenuItem);
        }
        var menuNb : NbMenuItem[];
        menuNb = menus;
        this.menu = menus;
      }

  });
}

parseJwt = function(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

/*doReplace = function(source) {
  return source.replace(this.toReplace, function(m) {
    return this.replaceWith[m];
  });
}*/

 doReplace = function(str){
   if (str != null){
    var conversions = new Object();

    conversions['á'] = '-a-';
    conversions['é'] = '-e-';
    conversions['í'] = '-i-';
    conversions['ó'] = '-o-';
    conversions['ú'] = '-u-';
    conversions['Á'] = '-A-';
    conversions['É'] = '-E-';
    conversions['Í'] = '-I-';
    conversions['Ó'] = '-O-';
    conversions['Ú'] = '-U-';

    for(var i in conversions){
        var re = new RegExp(conversions[i],"g");
        str = str.replace(re,i);
    }
   }
    return str;
  }
}
