import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FooterComponent } from './footer/footer.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { CrearCategoriaComponent } from './productos/crear-categoria/crear-categoria.component';
import { CrearMarcaComponent } from './productos/crear-marca/crear-marca.component';
import { SetPasswordComponent } from './perfil/set-password/set-password.component';
import { UpdatePerfilComponent } from './perfil/update-perfil/update-perfil.component';
import { DeleteAccountComponent } from './perfil/delete-account/delete-account.component';


@NgModule({
  declarations: [
    HomeComponent,
    InicioComponent,
    NavbarComponent,
    ProductosComponent,
    PerfilComponent,
    FooterComponent,
    CrearProductoComponent,
    CrearCategoriaComponent,
    CrearMarcaComponent,
    SetPasswordComponent,
    UpdatePerfilComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
