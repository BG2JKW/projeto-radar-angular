import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Cliente } from 'src/app/models/modeloCliente';
import { PedidoProduto } from 'src/app/models/modeloPedidoProduto';
import { Pedido } from 'src/app/models/modeloPedidos';
import { Produto } from 'src/app/models/modeloProduto';
import { ModeloClientesEstado } from 'src/app/models/modelViewDash/modeloClientesEstado';
import { ModeloProdutoInfo } from 'src/app/models/modelViewDash/modeloProdutoInfo';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';
import { PedidoProdutoServico } from 'src/app/services/servicePedidosProdutos/pedidoProdutoServico';
import { PedidoServico } from 'src/app/services/servicesPedidos/pedidoServico';
import { ProdutoServico } from 'src/app/services/servicesProdutos/produtoServico';
import { DashboardServico } from 'src/app/services/servicoDashboard/dashboardServico';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // ==================== DECLARAÇÃO DE SERVICOS PARA API ====================
  private pedidoServico: PedidoServico = {} as PedidoServico;
  private clienteServico: ClienteServico = {} as ClienteServico;
  private pedidoProdutoServico: PedidoProdutoServico = {} as PedidoProdutoServico;
  private produtoServico: ProdutoServico = {} as ProdutoServico;
  private servicoDash: DashboardServico = {} as DashboardServico;
  // ==========================================================================

  // ==================== PRODUTO INFO PARA O DASH ====================

  public produtoInfoDash:ModeloProdutoInfo[] | any= [];
  public clientesPorEstadoDash:ModeloClientesEstado[] | any = [];
  // ==================================================================


  // ==================== VALORES TOTAIS DO DASH ====================
  public valTotal: number = 0; // R$ VALOR TOTAL
  public qtdTotalClientes: number | any = 0; //QTD TOTAL DE CLIENTES
  public qtdTotalPedidos: number = 0; //QTD TOTAL DE PEDIDOS
  public qtdtotalProdutos: number = 0; //QTD TOTAL DE PRODUTOS
  // =================================================================


  // ==================== DADOS MAPA DE CALOR ====================
  public dadosMapaDeCalor: any = [];

  tipoGraficoMapaDeCalor: ChartType = ChartType.GeoChart;
  public optionsMapaDeCalor = {
    region: 'BR',
    resolution: 'provinces',
    backgroundColor: '#81d4fa',
    height: 350,
    align: 'center',
    colorAxis: {
      colors: [
        '#EAF2F8',
        '#D4E6F1',
        '#A9CCE3',
        '#7FB3D5',
        '#5499C7',
        '#2980B9',
        '#2471A3',
        '#1F618D',
        '#1A5276',
        '#154360',
      ],
    },
  };
  // ====================================================================


  // ==================== CONFIG QTD DE PRODUTOS EM ESTOQUE ====================
  public dadosQtdProdEstoqueDash: any[] = [];
  tipoGraficoQtdProdutosEstoque: ChartType = ChartType.Bar;
  public optionsGraficoProdutosEstoque = {
    pieSliceText: 'label',
    legend: { position: 'none' },
  };
  // ==========================================================================


  // ==================== CONFIG MOVIMENTACAO PRODUTO ====================
  public dataGraficoMovimentacaoProduto: any = [];
  tipoGraficoMovimentacaoProdutos: ChartType = ChartType.Bar;
  public optionsGraficoMovimentacaoProduto = {
    // heigth: 800,
    width: 850,
    bar: { groupWidth: '80%' },
    legend: { position: 'none' },
    isStacked: true,
    // hAxis: {textPosition: 'none'},
    hAxis: {textPosition: 'none'},
    vAxis: {textPosition: 'none'},
  };
  // ==========================================================================

  // ==================== CONFIG GANHOS POR PRODUTO ====================
  public dadosGanhoPorProduto: any = [];
  tipoGraficoGanhosPorProduto: ChartType = ChartType.PieChart;
  public optionsGraficoGanhoPorProduto = {
    pieSliceText: 'none',
    pieHole: 0.4,
  };

  // ==========================================================================

  public descPedidosCharts: any = {
    clicado: false,
    nomeProduto: '',
    valorTotal: 0,
  };

  public descProdutosCharts: any = {
    clicado: false,
    nomeProduto: '',
    qtdEstoque: 0,
    qtdVendida: 0,
  };

  // declarar dados
  public pedido: Pedido | undefined = {} as Pedido;
  public pedidoProduto: PedidoProduto | any = {} as PedidoProduto;
  public cliente: Cliente | undefined = {} as Cliente;

  public produtos: Produto[] | any = [];
  public pedidosProdutos: any = [];
  public pedidos: any = [];
  public todosClientes: any = [];


  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http);
    this.clienteServico = new ClienteServico(this.http);
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http);
    this.produtoServico = new ProdutoServico(this.http);
    this.servicoDash = new DashboardServico(this.http);
    this.chamarDados();
  }

  private async chamarDados() {
    this.produtos = await this.produtoServico.listarProdutos();
    this.pedidosProdutos = await this.pedidoProdutoServico.listarPedidoProduto();
    this.qtdTotalClientes = await this.clienteServico.listarTamanhoClientes();

    this.produtoInfoDash = await this.servicoDash.modeloProdutoInfo();    //***** */
    this.pedidos = await this.pedidoServico.listarPedidos();//************** */
    this.clientesPorEstadoDash = await this.servicoDash.modeloClientesPorEstado();

     //DADO GANHO TOTAL
     for (let i = 0; i < this.pedidos.length; i++) {
      this.valTotal += this.pedidos[i].valor_Total;
    }

    //DADOS PEDIDOS
    for (let i = 0; i < this.pedidos.length; i++) {
      this.qtdTotalPedidos += 1;
    }
    console.log(this.qtdTotalPedidos)

    //TOTAL DE PRODUTOS
    for (let i = 0; i < this.produtos.length; i++) {
      this.qtdtotalProdutos += 1;
    }

    //DADOS GRAFICO DE CALOR MAPA
    let novoDado = [];
    for (let i = 0; i < this.clientesPorEstadoDash.length; i++) {
      novoDado.push([
        `BR-${this.clientesPorEstadoDash[i].estado}`,
        this.clientesPorEstadoDash[i].qtd_clientes
      ]);
    }
    console.log(novoDado);
    this.dadosMapaDeCalor = novoDado;

     //DADOS PRODUTOS - VENDIDOS
    let novoProd = [];
    for (let i = 0; i < this.produtoInfoDash.length; i++) {
      let key = this.produtoInfoDash[i].nome;
      let valor = this.produtoInfoDash[i].qtd_total_vendida;
      novoProd.push([key, valor]);
    }
    this.dataGraficoMovimentacaoProduto = novoProd;

    //DADOS GANHO POR PROUTOS
    let novo = [];
    for (let i = 0; i < this.produtoInfoDash.length; i++) {
      let key = this.produtoInfoDash[i].nome;
      let valor = this.produtoInfoDash[i].faturamento_total;
      novo.push([key, valor]);
    }
    this.dadosGanhoPorProduto = novo;
    console.log(novo);

    //DADOS PRODUTOS - ESTOQUE
    let listaNovaProdutos = [];
    for (let i = 0; i < this.produtos.length; i++) {
      listaNovaProdutos.push([
        this.produtos[i].nome,
        this.produtos[i].qtd_Estoque,
      ]);
    }
    this.dadosQtdProdEstoqueDash = listaNovaProdutos;
    console.log(listaNovaProdutos);

    /* --------------------------------------------------------------------------------------------------*/

    console.log('Lista estado', this.dadosMapaDeCalor);
  }

  selecionado($event: any) {
    console.log($event);
    try {
      const { row, column } = $event.selection[0];
      const year = this.dadosQtdProdEstoqueDash[row][0];
      let teste: any = {};
      for (let i = 0; i < this.dataGraficoMovimentacaoProduto.length; i++) {
        let dado = this.dataGraficoMovimentacaoProduto[i];
        if (teste[dado[0]]) {
          teste[dado[0]] += dado[1];
        } else {
          teste[dado[0]] = dado[1];
        }
      }

      this.descProdutosCharts = {
        clicado: true,
        nomeProduto: year,
        qtdEstoque: this.dadosQtdProdEstoqueDash[row][column],
        qtdVendida: teste[year],
      };
      console.log(this.descProdutosCharts);
    } catch (err) {
      this.descProdutosCharts.clicado = false;
      console.log(err);
    }
  }

  selecionadoPizza($event: any) {
    try {
      const { row, column } = $event.selection[0];
      const year = this.dadosGanhoPorProduto[row][0];
      let teste: any = {};
      for (let i = 0; i < this.dadosGanhoPorProduto.length; i++) {
        let dado = this.dadosGanhoPorProduto[i];
        if (teste[dado[0]]) {
          teste[dado[0]] += dado[1];
        } else {
          teste[dado[0]] = dado[1];
        }
      }

      this.descPedidosCharts = {
        clicado: true,
        nomeProduto: year,
        valorTotal: teste[year],
      };

      console.log(year);
      console.log(teste[year]);

    } catch (err) {
      this.descPedidosCharts.clicado = false;
      console.log(err);
    }
  }

}
