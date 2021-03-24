/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';

@NgModule({
  declarations: [AppComponent], //Componentes y Pipes
  imports: [ //Módulos
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent], //Componente principal de la aplicación
  providers: [ //Servicios y cosas que queramos inyectar
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; } },
    AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
