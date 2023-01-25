import { LojaServico } from './../../services/serviceLojas/lojaServico';
import { Loja } from './../../models/modeloLoja';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'google-maps-demo',
  templateUrl: './google-maps-demo.component.html',
  styleUrls: ['./google-maps-demo.component.css']
})
export class GoogleMapsDemoComponent {
  apiLoaded: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router:Router,
    private routerParams: ActivatedRoute,
  ) {
    this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_swsQQ2u2w3S5tunR9SjpwbsYMlIWUS8', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  public loja:Loja | undefined
  private lojaServico:LojaServico = {} as LojaServico

  ngOnInit(): void {
    this.lojaServico = new LojaServico(this.http);
    const id:Number = this.routerParams.snapshot.params['id']
    this.buscaLoja(id);
  }

  private async buscaLoja(id:Number){ 
    this.loja = await this.lojaServico.buscarLojaPorId(id);
    await this.marcarLoja(id);
  }

  center: google.maps.LatLngLiteral = {lat: -12.193618384366214, lng: -47.4268417102256};
  zoom = 1;
  markerOptions: google.maps.MarkerOptions = {draggable: false, icon: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png'};
  markerPositions: google.maps.LatLngLiteral[] = [];

  async marcarLoja(id:Number){
    if(this.loja){
      var geocoder = new google.maps.Geocoder();
      this.loja = await this.lojaServico.buscarLojaPorId(id)
      var address = `${this.loja?.logradouro}, ${this.loja?.numero} - ${this.loja?.bairro}, ${this.loja?.cidade} - ${this.loja?.estado}, ${this.loja?.cep}, BRAZIL`
      geocoder.geocode({ 'address': address },  (results:any, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            this.center = {lat: latitude, lng: longitude}
            this.zoom = 18;
            this.markerPositions = [{lat: latitude, lng: longitude}]
        } else {
            alert("Request failed.")
        }
    });
    }
  }

  public voltar():void{
    this.router.navigateByUrl('/lista-lojas');
  }

}
