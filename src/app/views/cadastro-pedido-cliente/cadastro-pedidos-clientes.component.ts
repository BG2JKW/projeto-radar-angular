import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/modeloCliente';
import { PedidoProduto } from 'src/app/models/modeloPedidoProduto';
import { Pedido } from 'src/app/models/modeloPedidos';
import { Produto } from 'src/app/models/modeloProduto';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';
import { PedidoProdutoServico } from 'src/app/services/servicePedidosProdutos/pedidoProdutoServico';
import { PedidoServico } from 'src/app/services/servicesPedidos/pedidoServico';
import { ProdutoServico } from 'src/app/services/servicesProdutos/produtoServico';

@Component({
  selector: 'app-cadastro-pedidos-clientes',
  templateUrl: './cadastro-pedidos-clientes.component.html',
  styleUrls: ['./cadastro-pedidos-clientes.component.css']
})
export class CadastroPedidosClientesComponent implements OnInit {

  constructor(
    private router:Router,
    private http:HttpClient,
    private routerParams: ActivatedRoute,
  ) {}

  public pedidoForm: any = {
    idPedido: null,
    cpf: null,
    data: null,
  };

  private pedidoServico:PedidoServico = {} as PedidoServico
  private clienteServico:ClienteServico = {} as ClienteServico
  private pedidoProdutoServico:PedidoProdutoServico = {} as PedidoProdutoServico
  private produtoServico:ProdutoServico = {} as ProdutoServico

  public titulo:String = "Novo Pedido"

  public pedidoBd:Pedido | any = []
  
  public ListaProdFake: any  = [] 
  public pedidoProdutoFake:[] | undefined = []
  public produto:Produto | any = {} as Produto
  public valorPedidoTotal: number | any = 0

  public pedido:Pedido | undefined = {} as Pedido
  public pedidoProduto:PedidoProduto | any = {} as PedidoProduto
  public cliente:Cliente | undefined = {} as Cliente
  public produtos:Produto[] | any = [] 
  public EAN:number | undefined 
  public EANValido: boolean = false
  public CPFCadastrado: boolean = false
  public CPFValido: boolean = false
  public cpfCliente:String | undefined = this.cliente?.cpf
  public validaEans:number[]| any = []
  public validaPedidoProduto:boolean = false
  //teste
  public atualiza: boolean = false

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.clienteServico = new ClienteServico(this.http)
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http)
    this.produtoServico = new ProdutoServico(this.http)

    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.atualiza = true
      this.editaPedido(id)
    }else{
      this.pedidoForm.data = formatDate(new Date(), 'YYYY-MM-dd','pt-Br');;
      console.log("form data?:" + this.pedidoForm.data)
      this.buscaTamanhoListaPedido()
    }
  }

  retornaQtdEstoqueProduto(id:Number){
    for(let i=0;i<this.produtos.length;i++){
      if(this.produtos[i].id === id){
        return this.produtos[i].qtd_Estoque;
      }}
  }
  retornaValorProduto(id:Number){
    for(let i=0;i<this.produtos.length;i++){
      if(this.produtos[i].id === id){
        return this.produtos[i].valor;
      }
  }}
  retornaNomeProduto(id:Number){
    for(let i=0;i<this.produtos.length;i++){
      if(this.produtos[i].id === id){
        return this.produtos[i].nome;
      }
  }}
  retornaDescProduto(id:Number){
    for(let i=0;i<this.produtos.length;i++){
        if(this.produtos[i].id === id){
          return this.produtos[i].descricao;
        }
    }
  }

  searchcpf(event: any) {
    let id = String(event.target.value)
    this.buscarcpf(id)
  }

      private async buscarcpf(id: string) {
        
        try{
          this.cliente = await this.clienteServico.buscarClientePorCPF(id)
          this.CPFValido = true
        }catch(err){
          let resetLista:any = []
          this.cliente = resetLista
          this.CPFValido = false
          alert("CPF NÃO ENCONTRADO")
        }
      }

  searchproduct(event: any) {
    let id = Number(event.target.value)
    this.buscarProd (Number(id))
    }
    //this.buscarcpf(Number(id))

  private async buscarProd(id:Number){
    try{
      this.produto = await this.produtoServico.buscarProdutoPorId(id);
      console.log("PRODUTO" + this.produto);
      this.EANValido = true
    }catch(err){
      let resetLista:any = []
      this.produto = resetLista
      this.EANValido = false
    }
  }

  private async editaPedido(id: Number) {
    this.titulo = "Ver Pedido"
    //debugger
    this.pedido = await this.pedidoServico.buscarPedidoPorId(id)
    this.valorPedidoTotal = this.pedido?.valor_Total
    this.produtos = await this.produtoServico.listarProdutos();
    if(this.pedido && this.pedido.cliente_Id) this.cliente = await this.clienteServico.buscarClientePorId(this.pedido.cliente_Id)
    this.pedidoProduto = await this.pedidoProdutoServico.buscarPedidosProdutosPorId(id)
    if(this.cliente && this.cliente.cpf) {this.CPFCadastrado = true; this.CPFValido = true}
    else {this.CPFCadastrado  = false }
  }

  adicionarPedidoProduto(){
    let listaFake = {
      idProd: this.produto.id,
      nomeProd: this.produto.nome,
      desc: this.produto.descricao,
      qtd: this.pedidoProduto.quantidade,
      valTotal: (this.produto.valor * this.pedidoProduto.quantidade) 
    }
    if(!listaFake.qtd){
      alert("precisa ter uma quantidade")
      return
    }else if(listaFake.qtd > this.produto.qtd_Estoque){
      alert("Quantidade maior que a Permitida")
      return
    }

    if(this.validaEans){
      for(let i = 0;i < this.validaEans.length;i++){
      if(listaFake.idProd === this.validaEans[i]){
      alert("Ean ja cadastrado");
      return
      }
    }
  }
    this.ListaProdFake.push(listaFake)
    this.validaEans.push(listaFake.idProd)
    this.valorPedidoTotal = this.valorPedidoTotal + (this.produto.valor * this.pedidoProduto.quantidade)
    this.atualiza = true

  }

  excluirPedidoProduto(pedidofake: any){
    let listaPedidoNova = []
    for(let i=0;i<this.ListaProdFake.length;i++){
      if(this.ListaProdFake[i].idProd != pedidofake.idProd){
        listaPedidoNova.push(this.ListaProdFake[i])
      }else{
        this.valorPedidoTotal -= pedidofake.valTotal
        let validaEan:any = []
        for(let i=0;i<this.validaEans.length;i++){
          if(this.validaEans[i] != pedidofake.idProd){
            validaEan.push(this.validaEans[i])
          }
        }
        this.validaEans = validaEan
      }
    }
    this.ListaProdFake = listaPedidoNova
  }

  private async buscaTamanhoListaPedido(){
    this.produtos = await this.produtoServico.listarProdutos();
    
  }

    async salvar(){
    if(this.pedido && this.pedido.id > 0){
      this.pedidoServico.editarPedido(this.pedido)
    }
    else{
      if(confirm("Finalizar Pedido?")){

        this.pedidoBd = await this.pedidoServico.criarPedido({
        id: 0, 
        cliente_Id: this.cliente?.id,
        valor_Total: this.valorPedidoTotal,
        data: this.pedidoForm.data,
      });

      for(let i=0;i<this.ListaProdFake.length;i++){
        await this.pedidoProdutoServico.criarPedidoProduto({
            id: 0,
            pedido_Id: this.pedidoBd.id,
            produto_Id: this.ListaProdFake[i].idProd,
            quantidade: this.ListaProdFake[i].qtd,
            valor: this.ListaProdFake[i].valTotal,
        });
          for(let i=0;i<this.ListaProdFake.length;i++){
              await this.produtoServico.editarProduto({
                  id: this.ListaProdFake[i].idProd,
                  nome: this.ListaProdFake[i].nomeProd,
                  descricao: this.ListaProdFake[i].desc,
                  valor: this.retornaValorProduto(this.ListaProdFake[i].idProd),
                  qtd_Estoque: (this.retornaQtdEstoqueProduto(this.ListaProdFake[i].idProd) - this.ListaProdFake[i].qtd)
            });
          }
      }
    }else return

    }
    this.router.navigateByUrl("/lista-pedidos")
  }

  public cancelar():void{
    this.router.navigateByUrl('/lista-pedidos');
  }




}
