import { Observable } from 'rxjs';
import { ModeloCampanha } from './../../models/modeloCampanha';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { CampanhaService } from './../../services/servicesCampanha/campanha.service';

@Component({
  selector: 'app-lista-campanhas',
  templateUrl: './lista-campanhas.component.html',
  styleUrls: ['./lista-campanhas.component.css']
})
export class ListaCampanhasComponent implements OnInit {


  public campanhaList: Array<ModeloCampanha> = [];

  constructor(
    private http:HttpClient,
    private router:Router,
    private campanhaService: CampanhaService
  ) { }

  ngOnInit(): void {
    this.campanhaService.campanhaList().subscribe(
      res => this.campanhaList = res
    );
  }

  // public adicionarCampanha(campanha: ModeloCampanha): Observable<ModeloCampanha> {
  //   return this.campanhaService.criarCampanha(campanha).subscribe(
  //     next: res => res,
  //     error: error => error
  //   )
  // }

}
