import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface Alumno {
  nombre: string;
  curso: string;
  nota: number;
  estado: string;
}

export interface Cursos {
  nombre: string;
}
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent implements OnInit {
  @Input() titulo: string = '';
  public formularioAlta: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    nota: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });
  public mostrarGrid: boolean = true;
  public mostrarAltaAlumno: boolean = false;
  public mostrarModificacion: boolean = false;

  public indice: number = 0;
  public claseA: Alumno[] = [
    { nombre: 'Gaston', curso: 'Cocina', nota: 10, estado: 'Aprobado' },
    { nombre: 'Lara', curso: 'Mecanica', nota: 9, estado: 'Aprobado' },
    { nombre: 'Daniela', curso: 'Programación', nota: 10, estado: 'Aprobado' },
    { nombre: 'Pepe', curso: 'Cocina', nota: 4, estado: 'Reprobado' },
    { nombre: 'Oscar', curso: 'Mecanica', nota: 5, estado: 'Reprobado' },
    { nombre: 'Emmanuel', curso: 'Mecanica', nota: 10, estado: 'Aprobado' },
  ];
  public cursosArray: Cursos[] = [
    { nombre: 'Cocina' },
    { nombre: 'Programación' },
    { nombre: 'Mecanica' },
  ];
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  public CargarAlumno() {
    const item: Alumno = {
      nombre: this.formularioAlta.get('nombre')?.value,
      curso: this.formularioAlta.get('curso')?.value,
      nota: this.formularioAlta.get('nota')?.value,
      estado: this.formularioAlta.get('estado')?.value,
    };

    this.claseA.push(item);

    this.formularioAlta.reset();
    this.mostrarGrid = true;
    this.mostrarAltaAlumno = false;
    this.mostrarModificacion = false;
  }
  public NuevoAlumno() {
    this.formularioAlta.reset();
    this.mostrarGrid = false;
    this.mostrarAltaAlumno = true;
    this.mostrarModificacion = false;
  }
  public EditarAlumno(i: number) {
    this.mostrarGrid = false;
    this.mostrarAltaAlumno = false;
    this.mostrarModificacion = true;
    this.indice = i;
    this.formularioAlta.setValue({
      nombre: this.claseA[i].nombre,
      curso: this.claseA[i].curso,
      nota: this.claseA[i].nota,
      estado: this.claseA[i].estado,
    });
  }

  public procesarModificacion() {
    this.claseA[this.indice].nombre = this.formularioAlta.get('nombre')?.value;
    this.claseA[this.indice].curso = this.formularioAlta.get('curso')?.value;
    this.claseA[this.indice].nota = this.formularioAlta.get('nota')?.value;
    this.claseA[this.indice].estado = this.formularioAlta.get('estado')?.value;
    this.formularioAlta.reset();
    this.mostrarGrid = true;
    this.mostrarAltaAlumno = false;
    this.mostrarModificacion = false;
  }
  public cancelarCarga() {
    this.mostrarGrid = true;
    this.mostrarAltaAlumno = false;
    this.mostrarModificacion = false;
  }
}
