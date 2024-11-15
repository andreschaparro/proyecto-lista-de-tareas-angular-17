import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  // El componente está declarado como standalone, por lo que no requiere de un módulo
  standalone: true,
  // Importar CommonModule, FormsModule
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  listaTareas: string[] = [];
  nuevaTarea: string = '';

  // Inyección hecha en Angular 17 sin utilizar el constructor
  private _tareasServices = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareasServices.getTareas();
  }

  agregarTarea() {
    this._tareasServices.agregarTarea(this.nuevaTarea);
    // Limpia el input
    this.nuevaTarea = '';
    // Actualiza la lista de tareas 
    this.listaTareas = this._tareasServices.getTareas();
  }

  eliminarTarea(index: number) {
    this._tareasServices.eliminarTarea(index);
    this.listaTareas = this._tareasServices.getTareas();
  }

}
