import { Routes } from '@angular/router';
import { ListaCarreraComponent } from './lista-carrera/lista-carrera.component';
import { AltaCarreraComponent } from './alta-carrera/alta-carrera.component';

export const routes: Routes = [
    {path:'', component:ListaCarreraComponent, children:
        [
            {path:'alta', component:AltaCarreraComponent},
            {path:'edicion/:id', component:AltaCarreraComponent}
        ]
    }
];
