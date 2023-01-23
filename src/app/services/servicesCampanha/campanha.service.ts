import { GetToken } from './../redirect/getToken';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModeloCampanha } from './../../models/modeloCampanha';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  private list: Array<ModeloCampanha> = []

  constructor(private http: HttpClient) { }

  public campanhaList(): Observable<Array<ModeloCampanha>> {
    return this.http.get<Array<ModeloCampanha>>(`${environment.API}/campanhas`, {headers:GetToken.token()}).pipe(
      res => res,
      error => error
    );
  }

  public criarCampanha(campanha: ModeloCampanha): Observable<ModeloCampanha> {
    return this.http.post<ModeloCampanha>(`${environment.API}/campanhas`, campanha, {headers:GetToken.token()})
  }

  atualizarCampanha(campanha: ModeloCampanha, id: string) {
    return this.http.post<ModeloCampanha[]>(`${environment.API}/campanhas/${id}`, campanha, {headers:GetToken.token()});
  }

  deleteCampanha(campanha: ModeloCampanha, id: string) {
    return this.http.delete<ModeloCampanha[]>(`${environment.API}/campanhas/${id}`, {headers:GetToken.token()});
  }
}
