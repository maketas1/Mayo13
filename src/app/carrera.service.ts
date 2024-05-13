import { Injectable } from '@angular/core';
import { Carrera } from './_modelo/Carrera';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private url: string ='http://localhost:8080/carreras';
  carreraCambio = new Subject<Carrera[]>();

  constructor(private http:HttpClient) {}

  listar(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.url)
    .pipe(
      map(data => {return data.sort((a,b) => a.id_carrera-b.id_carrera);})
    );
  }

  listarPorId(id:number) {
    return this.http.get<Carrera>(`${this.url}/${id}`);
  }

  alta(p:Carrera) {
    console.log(p);
    return this.http.post(this.url, p);
  }

  modificar(p:Carrera) {
    console.log('datos a modificar: ' + p.id_carrera + p.nombre_carrera + p.fecha + p.ubicacion + p.cantridad_vueltas);
    return this.http.put(this.url, p);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
