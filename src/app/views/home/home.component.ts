import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Loja } from 'src/app/models/modeloLoja';
import { LojaServico } from 'src/app/services/serviceLojas/lojaServico';
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
    private route: Router
  ) {
    this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_swsQQ2u2w3S5tunR9SjpwbsYMlIWUS8', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  public lojas:Loja[] | undefined = []
  private lojaServico:LojaServico = {} as LojaServico

  private usuarioValido:TokenServico = {} as TokenServico

  ngOnInit(): void {
    this.usuarioValido = new TokenServico(this.http);
    this.lojaServico = new LojaServico(this.http);
    this.listaLojas();
    console.log(this.markerPositions)
  }

  private async listaLojas(){ //METODO QUE LISTA OS PRODUTOS PEGANDO DA API JUNTO COM O 'PRODUTO SERVICO'
    this.lojas = await this.lojaServico.listarLojas();
    await this.marcarLojas();
  }

  center: google.maps.LatLngLiteral = {lat: -15.793889, lng: -47.882778};
  zoom = 5;
  markerOptions: google.maps.MarkerOptions = { 
    draggable: false, 
    icon: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png',
  };
  markerPositions: google.maps.LatLngLiteral[] = [{lat:  -15.793889, lng: -47.882778}];

  private marcarLojas(){
    if(this.lojas){
      for(let loja of this.lojas){
        let cords = { lat: loja.latitude, lng: loja.longitude }
        this.markerPositions.push(cords);
      }
    }
  }

}
