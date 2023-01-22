import { Login } from './../models/modeloLogin';
import { Logado } from './../models/modeloLogado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { GetToken } from './redirect/getToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostrarNav = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private route: Router
    ) {
  }

  public async fazerLogin(login:Login): Promise<Boolean | undefined> {

    try{
      //debugger
      let loginRest:Logado | undefined = await firstValueFrom(this.http.post<Logado>(`${environment.API}/login/`, login))
      localStorage.setItem('usuarioLogado',loginRest.nome);
      localStorage.setItem('permissao',loginRest.permissao);
      localStorage.setItem('token',loginRest.token);
      //this.route.navigateByUrl('/dashboard')
      console.log(loginRest);

      return true;

    }catch(err){
      alert("Usuario ou senha inválidos");
      console.log(err);
      return false
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    return true
    try{
      let logado:String | undefined = await firstValueFrom(this.http.get<String>(`${environment.API}/authToken/`, {headers:GetToken.token()}))
      if(logado === 'logado') {
        console.log("=========== Retonou TRUE no 'LOGADO' ===========");
        this.mostrarNav.emit(true);
        return true;
      }else{
        console.log("=========== Retonou FALSE no 'LOGADO' ===========");
        this.mostrarNav.emit(false);
        return false
      }
    }catch(err){
      console.log("ERRO NO IS AUTH" + err);
      return false;
    }
  }

}
