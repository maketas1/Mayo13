import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarreraService } from '../carrera.service';
import { Carrera } from '../_modelo/Carrera';

@Component({
  selector: 'app-alta-carrera',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './alta-carrera.component.html',
  styleUrl: './alta-carrera.component.css'
})
export class AltaCarreraComponent implements OnInit {
  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private servicio: CarreraService
  ){this.form = new FormGroup({
    'id_carrera': new FormControl(0),
    'nombre_carrera': new FormControl(''),
    'fecha': new FormControl(''),
    'ubicacion': new FormControl(''),
    'cantridad_vueltas': new FormControl('')
  });}
  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}

formaFormulario() {
  if(this.edicion){
    this.servicio.listarPorId(this.id)
      .subscribe(data => {
        this.form = new FormGroup({
          'id_carrera': new FormControl(data.id_carrera),
          'nombre_carrera': new FormControl(data.nombre_carrera),
          'fecha': new FormControl(data.fecha),
          'ubicacion':new FormControl(data.ubicacion),
          'cantridad_vueltas':new FormControl(data.cantridad_vueltas)
        });
      })
  }

}

operar(){
  let e:Carrera = {
    'id_carrera': this.form.value['id_carrera'],
    'nombre_carrera' : this.form.value['nombre_carrera'],
    'fecha': this.form.value['fecha'],
    'ubicacion':this.form.value['ubicacion'],
    'cantridad_vueltas':this.form.value['cantridad_vueltas']
  }
  if(this.edicion){
   
    this.servicio.modificar(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data=>{
            this.servicio.carreraCambio.next(data);
          });
      });
  }else{
    this.servicio.alta(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.carreraCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}

}
