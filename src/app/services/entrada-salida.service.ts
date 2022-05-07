import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntradaSalidaService {
  private uri: string = environment.uri+"/registro-visita"
  constructor(private http:HttpClient) { }

  public regitraEntrada = (cvePlaca:string) => {

    return this.http.get(this.uri+"/entrada/"+cvePlaca)
  }

  public regitraSalida = (cvePlaca:string) => {
    
    return this.http.patch(this.uri+"/salida/"+cvePlaca,[])
  }

}
