import { Component, OnInit } from '@angular/core';
import { TipoVehiculoService } from '../../services/tipo-vehiculo.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss']
})
export class TipoVehiculoComponent implements OnInit {

  constructor(private tipoVehiculoService:TipoVehiculoService) { }

  lstTipoVehiculo: any[] = [];
  modalNvoTipoVehiculo: boolean = false;

  getLstTipoVehiculos = () => {
    this.tipoVehiculoService.getLista().subscribe({
      next: (response:any) => {
        // console.log(response)
        this.lstTipoVehiculo = response;
        console.log(this.lstTipoVehiculo)
      },
      error: error => {}
    });
  }

  abreModal = () => {
    this.modalNvoTipoVehiculo = true;
  }

  eliminaTipoVehiculo = (cveTipoVehiculo:number) => {
    this.tipoVehiculoService.eliminaTipoVehiculo(cveTipoVehiculo).subscribe({
      next: (response:any) => {
        this.getLstTipoVehiculos();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha guardado el cliente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  formNvoTipoVehiculo = new FormGroup({
    descTipoVehiculo: new FormControl('',[Validators.required,Validators.minLength(4)]),
    tarifa: new FormControl(0,[Validators.required])
  });

  get ft(){
    return this.formNvoTipoVehiculo.controls
  }

  creaTipoVehiculo = () => {
    console.log(this.formNvoTipoVehiculo.value);
    let body = this.formNvoTipoVehiculo.value;
    this.tipoVehiculoService.nuevoTipoVehiculo(body).subscribe({
      next: (response:any) => {
        this.getLstTipoVehiculos();
        this.modalNvoTipoVehiculo = true;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha guardado el cliente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  ngOnInit(): void {
    this.getLstTipoVehiculos();
  }

}
