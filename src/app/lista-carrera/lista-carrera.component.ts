import { Component } from '@angular/core';
import { AltaCarreraComponent } from '../alta-carrera/alta-carrera.component';
import { RouterModule } from '@angular/router';
import { CarreraService } from '../carrera.service';
import { Carrera } from '../_modelo/Carrera';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-carrera',
  standalone: true,
  imports: [AltaCarreraComponent, RouterModule],
  templateUrl: './lista-carrera.component.html',
  styleUrl: './lista-carrera.component.css'
})
export class ListaCarreraComponent {
  constructor(private servicio:CarreraService){}

  carrera:Carrera[] = [];

  ngOnInit(): void {
    this.servicio.carreraCambio
    .subscribe((data) => {this.carrera = data});

    this.servicio.listar()
    .subscribe(datos => {
      this.carrera = datos;
      console.log("entra");
    })
  }

  eliminar(id:number){
    this.servicio.eliminar(id)
    .subscribe(() =>
      {
        this.servicio.listar()
        .subscribe(data => this.servicio.carreraCambio.next(data));
      }
    )
  }

  recivirAviso(listaActualizada:Observable<Carrera[]>) {
    console.warn("Regresa el padre ---")

    this.servicio.listar()
    .subscribe(datos => {
      this.carrera = datos;
      console.log("entra");
    })
  }
}
