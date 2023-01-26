import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/guard/auth-service.service';
import { TokenServico } from 'src/app/services/token/tokenServico';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  private authService:AuthService = {} as AuthService
  private tokenServico:TokenServico = {} as TokenServico
  ngOnInit(): void {
    this.authService = new AuthService(this.http);    
    this.tokenServico = new TokenServico(this.http);
    this.estaLogado();
  }

  async estaLogado(){
    let res = await this.tokenServico.tokenValido()
    if(res){
      this.router.navigateByUrl("/home");
    }
  }
  
  public logado:boolean = false
  public email:string = ""
  public senha:string = ""
  public mensagem:string = ""

  async logar(){
    debugger
    let logado = await this.authService.fazerLogin({email: this.email,senha: this.senha });
    if(logado == true){
      this.router.navigateByUrl('/home');
    }else{
      this.mensagem = "Email ou senha inválidos.";
      return console.log("nada");
    }
  }

}
