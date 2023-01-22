import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../services/auth-service.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.authService = new AuthService(this.http,this.router);    
  }
  
  public email:string = ""
  public senha:string = ""
  public mensagem:string = ""

  async logar(){
    let logado = await this.authService.fazerLogin({email: this.email,senha: this.senha });
    if(logado == true){
      this.router.navigateByUrl('/dashboard');
    }else{
      return console.log("nada");
    }
  }

}
