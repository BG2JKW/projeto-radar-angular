import { Observable } from 'rxjs';
import { Loja } from './../../models/modeloLoja';
import { LojaServico } from './../../services/serviceLojas/lojaServico';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CepService } from 'src/app/services/guard/cep.service';

@Component({
  selector: 'app-cadastro-lojas',
  templateUrl: './cadastro-lojas.component.html',
  styleUrls: ['./cadastro-lojas.component.css']
})
export class CadastroLojasComponent implements OnInit {

  constructor(
    private router:Router,
    private http:HttpClient,
    private routerParams: ActivatedRoute,
    private cepService: CepService,

  ) { }

  private lojaServico:LojaServico = {} as LojaServico
  public titulo:String = "Nova Loja"
  public loja:Loja | undefined = {} as Loja
  public cepValido:boolean | undefined;
  
  ngOnInit(): void {
    this.lojaServico = new LojaServico(this.http)
    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.editarLoja(id)
    }
  }

  private async editarLoja(id: Number) {
    this.titulo = "Editar Loja"
    this.loja = await this.lojaServico.buscarLojaPorId(id)
    console.log(this.loja)
  }
 
  async salvar(){
    debugger
    if(this.loja && this.loja.id > 0){
      await this.lojaServico.editarLoja(this.loja)
    }
    else{
     
     var teste =  await this.lojaServico.criarLoja({
        id: 0, 
        nome: this.loja?.nome ,
        observacao: this.loja?.observacao,
        cep: this.loja?.cep,
        logradouro: this.loja?.logradouro,
        numero: this.loja?.numero,
        bairro: this.loja?.bairro,
        cidade: this.loja?.cidade,
        estado: this.loja?.estado?.toUpperCase(),
        complemento: this.loja?.complemento,
        latitude: this.loja?.latitude,
        longitude: this.loja?.longitude,
      });
      console.log(teste);
    }
    this.router.navigateByUrl("/lista-lojas")
  }

  public cancelar():void{
    this.router.navigateByUrl('/lista-lojas');
  }
  
  consultaCep(valor:any){
    this.cepService.buscarCep(valor.target.value)
      .subscribe(
        (res) => { this.popularForm(res, true) },
        err => { this.popularForm(err, false) },
        () => console.log('Observable complete!')
      );
  }

  popularForm(dados:any, validacao:boolean){
    var localId = 0
    if(this.loja && this.loja.id > 0){
      localId = this.routerParams.snapshot.params['id']
    }

    if(validacao){
      var geocoder = new google.maps.Geocoder();
      var latitude = 0;
      var longitude = 0;
      var address = `${this.loja?.logradouro}, ${this.loja?.numero} - ${this.loja?.bairro}, ${this.loja?.cidade} - ${this.loja?.estado}, ${this.loja?.cep}, BRAZIL`
      geocoder.geocode({ 'address': address }, (results:any, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
        } else {
            console.log("Request failed.", this.loja);
        }

        var loja:Loja = {
            id: localId,
            nome: this.loja?.nome,
            observacao: this.loja?.observacao,
            cep: dados.cep,
            logradouro: dados.logradouro,
            numero: this.loja?.numero,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
            complemento: dados.complemento,
            latitude: latitude,
            longitude: longitude,
        }
        this.loja = loja;
        console.log(latitude, longitude, this.loja);
        this.cepValido = true;
      });
    }
    else{
      var loja:Loja = {
        id: localId,
        nome: this.loja?.nome,
        observacao: this.loja?.observacao,
        cep: this.loja?.cep,
        logradouro: "",
        numero: this.loja?.numero,
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
        latitude: 0,
        longitude: 0,
      }
      this.loja = loja;
      this.cepValido = false;
    }
    return dados;
  }

}
