import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { map, catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Loja } from 'src/app/models/modeloLoja';
import { ModeloPedidosEstado } from 'src/app/models/modelViewDash/modeloPedidosEstado';
import { LojaServico } from 'src/app/services/serviceLojas/lojaServico';
import { DashboardServico } from 'src/app/services/servicoDashboard/dashboardServico';
import { TokenServico } from 'src/app/services/token/tokenServico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(
    private http: HttpClient,
  ) {
    this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_swsQQ2u2w3S5tunR9SjpwbsYMlIWUS8', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }


  public pedidosEstados:ModeloPedidosEstado[] | undefined = []
  public lojas:Loja[] | undefined = []

  private lojaServico:LojaServico = {} as LojaServico
  private pedidoEstadoServico:DashboardServico = {} as DashboardServico

    ngOnInit(): void {
    this.lojaServico = new LojaServico(this.http);
    this.pedidoEstadoServico = new DashboardServico(this.http)
    this.listaLojas();
    console.log(this.markerPositions)
  }

  private async listaLojas(){ //METODO QUE LISTA OS PRODUTOS PEGANDO DA API JUNTO COM O 'PRODUTO SERVICO'
    this.lojas = await this.lojaServico.listarLojas();
    console.log(this.lojas);
    this.pedidosEstados = await this.pedidoEstadoServico.modeloPedidosPorEstado();
    console.log(this.pedidosEstados);
    await this.marcarLojas();
  }


  public mapOptions: google.maps.MapOptions = {
    maxZoom: 4.5,
    minZoom: 4.5,
    draggable: false,
  }

   center: google.maps.LatLngLiteral = {lat: -15.793889, lng: -47.882778};
   zoom = 5;
   markerOptions: google.maps.MarkerOptions = {
      draggable: false,
      icon: "",
   };
   markerPositions: google.maps.LatLngLiteral[] = [{lat:  -15.793889, lng: -47.882778}];

  private marcarLojas(){
    if(this.lojas){
      for(let loja of this.lojas){
        if(loja.latitude && loja.longitude){
          let cords = { lat: loja.latitude, lng: loja.longitude }
          this.markerPositions.push(cords);
        }
      }
    }
  }

}
