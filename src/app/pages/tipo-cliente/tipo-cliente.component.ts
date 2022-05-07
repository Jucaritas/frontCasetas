import { Component, OnInit } from '@angular/core';
import { TipoClienteService } from '../../services/tipo-cliente.service';
import { TipoVehiculoService } from '../../services/tipo-vehiculo.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-cliente',
  templateUrl: './tipo-cliente.component.html',
  styleUrls: ['./tipo-cliente.component.scss']
})
export class TipoClienteComponent implements OnInit {

  constructor(private tipoClienteService:TipoClienteService, private tipoVehiculoService:TipoVehiculoService) { }

  lstTipoClientes: any[] = [];
  lstTipoVehiculo: any[] = [];
  modalNvoTipoVehiculo: boolean = false;

  getlstTipoClientes = () => {
    this.tipoClienteService.getListaClientes().subscribe({
      next: (response:any) => {
        this.lstTipoClientes = response;
      },
      error: error => {}
    });
  }

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

  eliminaTipoCliente = (cvePlaca:string) => {
    this.tipoClienteService.eliminaTipoCliente(cvePlaca).subscribe({
      next: (response:any) => {
        this.getlstTipoClientes();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'se ha eliminado el cliente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  getDescTipoVehiculo = (cveTipoVehiculo: number) => {
    
    let index = this.lstTipoVehiculo.findIndex(x => x.cveTipoVehiculo == cveTipoVehiculo);
    let descTipoVehiculo = (index === -1)? "no definida": this.lstTipoVehiculo[index].descTipoVehiculo;
    return descTipoVehiculo;
  }

  formNvoTipoCliente = new FormGroup({
    cvePlaca: new FormControl('',[Validators.required,Validators.minLength(7)]),
    tipoVehiculo: new FormControl('',[Validators.required])
  })

  get fn(){
    return this.formNvoTipoCliente.controls
  }

  creaTipoCliente = () => {
    let form = this.formNvoTipoCliente.value;
    let cvePlaca = form.cvePlaca;
    let tipoVehiculo = +form.tipoVehiculo;
    let body = {cvePlaca, tipoVehiculo}
    this.tipoClienteService.creaNvoTipoCliente(body).subscribe({
      next: (response:any) => {
        this.getlstTipoClientes()
        this.modalNvoTipoVehiculo = false;
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
  };

  abreModal = () => {
    this.modalNvoTipoVehiculo = true;
  }

  ngOnInit(): void {
    this.getlstTipoClientes();
    this.getLstTipoVehiculos();
  }

}
