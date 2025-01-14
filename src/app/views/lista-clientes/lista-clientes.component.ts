import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/modeloCliente';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }
   
  private clienteServico:ClienteServico = {} as ClienteServico
  public clientes:Cliente[] | undefined = []
  

  ngOnInit(): void { //INICIANDO A LISTA DE CLIENTES COM O OBJETO CARREGADO DA API
    this.clienteServico = new ClienteServico(this.http)
    this.listaClientes()
  }

  private async listaClientes(){ //METODO QUE LISTA OS CLIENTES PEGANDO DA API JUNTO COM O 'CLIENTE SERVICO'
   this.clientes = await this.clienteServico.listarClientes();
  }

  novoCliente(){
    this.router.navigateByUrl("cadastro-cliente")
  }

  editarCliente(id:Number){
    this.router.navigateByUrl(`/cadastro-cliente/${id}`)
  }

  public async deletar(id:Number){
    await this.clienteServico.excluirClientePorId(id);
    //this.router.navigate('/lista-clientes');
    this.redirectTo('/lista-clientes')

  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
