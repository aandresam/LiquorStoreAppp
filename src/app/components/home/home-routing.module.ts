import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearCategoriaComponent } from './productos/crear-categoria/crear-categoria.component';
import { CrearMarcaComponent } from './productos/crear-marca/crear-marca.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'productos', component: ProductosComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'productos/crear-producto', component: CrearProductoComponent},
    { path: 'productos/actualizar-producto/:id', component: CrearProductoComponent},
    { path: 'productos/categorias', component: CrearCategoriaComponent},
    { path: 'productos/marcas', component: CrearMarcaComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
