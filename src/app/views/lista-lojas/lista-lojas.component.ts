import { LojaServico } from './../../services/serviceLojas/lojaServico';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from 'src/app/models/modeloLoja';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(
    private http:HttpClient,
    private router:Router,
  ) {
    this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_swsQQ2u2w3S5tunR9SjpwbsYMlIWUS8', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  private LojaServico:LojaServico = {} as LojaServico
  public lojas:Loja[] | undefined = []
  public loja:Loja | undefined = {} as Loja

  ngOnInit(): void { //INICIANDO A LISTA DE LOJAS COM O OBJETO CARREGADO DA API
    this.LojaServico = new LojaServico(this.http)
    this.listaLojas()
  }

  private async listaLojas(){ //METODO QUE LISTA OS LOJAS PEGANDO DA API JUNTO COM O 'LOJA SERVICO'
   this.lojas = await this.LojaServico.listarLojas();
  }

  novoLoja(){
    this.router.navigateByUrl("cadastro-loja")
  }

  editarLoja(id:Number){
    this.router.navigateByUrl(`/cadastro-loja/${id}`)
  }

  public async deletar(id:Number){
    await this.LojaServico.excluirLojaPorId(id);
    //this.router.navigate('/lista-lojas');
    this.redirectTo('/lista-lojas')
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  getLocation(id:Number) {
    this.router.navigateByUrl(`/lojas-maps/${id}`)
  }

}
