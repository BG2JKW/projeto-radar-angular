import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/modeloPedidos';
import { PedidoCPF } from 'src/app/models/modelViewDash/modeloPedidoComCpf';
import { PedidoServico } from 'src/app/services/servicesPedidos/pedidoServico';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  public pedidos:PedidoCPF[] | undefined = []
  private pedidoServico:PedidoServico = {} as PedidoServico 

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.listaPedidos()
  }

  private async listaPedidos(){ //METODO QUE LISTA OS PRODUTOS PEGANDO DA API JUNTO COM O 'PRODUTO SERVICO'
    this.pedidos = await this.pedidoServico.listarPedidosComCpf();
  
    }

  novoPedido(){
    this.router.navigateByUrl("/cadastro-pedido")
  }

  editarPedido(id:Number){
    this.router.navigateByUrl(`/cadastro-pedido/${id}`)
  }

  

}
