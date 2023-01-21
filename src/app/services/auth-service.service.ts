import { Login } from './../models/modeloLogin';
import { Logado } from './../models/modeloLogado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public async isAuthenticated(token: String): Promise<boolean> {
    let head_obj = new HttpHeaders().set("Authorization","bearer "+token);
    let loginRest: string | undefined = await firstValueFrom(this.http.get<string>(`${environment.API}/authToken/`, {headers:head_obj}))
    console.log(loginRest);
    if(loginRest == null) return false;
    return true;
  }


  constructor(
    private http: HttpClient,
    private route: Router
    ) {
  }

  public async fazerLogin(login:Login): Promise<Logado | undefined> {

    try{
      let loginRest:Logado | undefined = await firstValueFrom(this.http.post<Logado>(`${environment.API}/login/`, login))
      localStorage.setItem('usuarioLogado',loginRest.nome);
      localStorage.setItem('permissao',loginRest.permissao);
      localStorage.setItem('token',loginRest.token);
      this.route.navigateByUrl('/dashboard')
      return loginRest;
    }catch(err){
      alert("Usuario ou senha inválidos");
      console.log(err);
      return
    }
  }
}
