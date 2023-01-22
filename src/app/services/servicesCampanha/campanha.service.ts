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

  public campanhaList(): Observable<ModeloCampanha> {
    const token = localStorage.getItem('token');
    const headerToken = new HttpHeaders().set("Authorization","bearer "+token);
    return this.http.get<ModeloCampanha>(`${environment.API}/campanhas`, {headers:headerToken}).pipe(
      res => res,
      error => error
    );
  }

  public criarCampanha(value: ModeloCampanha) {
    return this.list.push({
      id: 0,
      nome: "",
      descricao: "",
      data: new Date(),
      urlImgPrateleira: ""
    })
  }
}
