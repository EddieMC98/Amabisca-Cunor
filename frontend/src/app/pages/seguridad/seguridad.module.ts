import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SeguridadRoutingModule, routedComponents } from './seguridad-routing.module';
import { UsuarioService} from '../../@core/data/usuarios.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosModalComponent } from './usuarios/usuarios-modal.component';
import { UsuariosDialogComponent} from './usuarios/usuarios-dialog.component';
import { RolService} from '../../@core/data/rol.service';
import { RolesComponent } from './roles/roles.component';
import { RolesModalComponent } from './roles/roles-modal.component';
import { RolesDialogComponent} from './roles/roles-dialog.component';
import { PermisosComponent } from './roles/permisos.component';
import { MenuService } from '../../@core/data/menu.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';

const components = [
  UsuariosComponent,
  UsuariosModalComponent,
  UsuariosDialogComponent,
  RolesComponent,
  RolesModalComponent,
  RolesDialogComponent,
  PermisosComponent,
];

@NgModule({
  imports: [
    ThemeModule,    
    SeguridadRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    UsuarioService,
    RolService,
    DatePipe,
    MenuService,
    ToasterService,
  ],
  entryComponents: [
    UsuariosModalComponent,
    UsuariosDialogComponent,
    RolesModalComponent,
    RolesDialogComponent,
  ],
})
export class SeguridadModule { }
