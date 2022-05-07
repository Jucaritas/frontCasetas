import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { mdlTipoCliente } from '../models/TipoClienteModel';

@Injectable({
  providedIn: 'root'
})
export class TipoClienteService {
  private uri: string = environment.uri+"/tipo_cliente"

  constructor(private http:HttpClient) { }

  public getListaClientes = () => {
    return this.http.get(this.uri+'/lista')
  }

  public getTipoClientePorPlaca = (cvePlaca: string) => {
    return this.http.get(this.uri+'/'+cvePlaca)
  }

  public creaNvoTipoCliente = (cliente:mdlTipoCliente) => {
    return this.http.post(this.uri+'/nuevo',cliente)
  }

  public eliminaTipoCliente = (cvePlaca: string) => {
    return this.http.delete(this.uri+"/elimina/"+cvePlaca)
  }

}
