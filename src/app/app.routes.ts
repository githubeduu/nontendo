import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { CategoryRegistroComponent } from './components/category-registro/category-registro.component';
import { CategoryXboxSeriesComponent } from './components/category-xbox-series/category-xbox-series.component';
import { CategoryPlaystation5Component } from './components/category-playstation-5/category-playstation-5.component';
import { CategoryPlaystation4Component } from './components/category-playstation-4/category-playstation-4.component';
import { CategoryNintendoSwitchComponent } from './components/category-nintendo-switch/category-nintendo-switch.component';
import { LoginComponent } from './components/login/login.component';
import { CarroComponent } from './components/carro/carro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent }, 
    { path: 'categoryNintendoSwitch', component: CategoryNintendoSwitchComponent },
    { path: 'categoryPlaystation4', component: CategoryPlaystation4Component },
    { path: 'categoryPlaystation5', component: CategoryPlaystation5Component },
    { path: 'categoryXboxSeries', component: CategoryXboxSeriesComponent },
    { path: 'categoryRegistro', component: CategoryRegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'carro', component: CarroComponent },
    { path: 'recuperarContrasena', component: RecuperarContrasenaComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'mantenedorProductos', component: MantenedorProductosComponent }
];
