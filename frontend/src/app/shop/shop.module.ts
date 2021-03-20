import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ShopComponent } from './shop.component';
import { InicioModule } from './inicio/inicio.module';

const PAGES_COMPONENTS = [
  ShopComponent,
];

@NgModule({
  imports: [
    ShopRoutingModule,
    InicioModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class ShopModule {
}
