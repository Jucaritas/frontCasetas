import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EntradaSalidaService } from '../../services/entrada-salida.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private entradaSalidaService:EntradaSalidaService) { }
  
  formIngreso = new FormGroup({
    cvePlaca: new FormControl('',[Validators.required, Validators.minLength(7)])
  });

  get fe(){
    return this.formIngreso.controls
  }

  registraEntrada = () => {
    let placa = this.formIngreso.value.cvePlaca
    this.entradaSalidaService.regitraEntrada(placa).subscribe({
      next: (response:any) => {
        this.formIngreso.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado la entrada',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se ha podido registrado la entrada',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  formSalida = new FormGroup({
    cvePlaca: new FormControl('',[Validators.required, Validators.minLength(7)])
  });

  get fs(){
    return this.formIngreso.controls
  }

  registraSalida = () => {
    let placa = this.formSalida.value.cvePlaca
    this.entradaSalidaService.regitraSalida(placa).subscribe({
      next: (response:any) => {
        this.formSalida.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado la salida',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se ha podido registrado la salida',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
