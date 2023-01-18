import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CadastroProdutosComponent } from './views/cadastro-produto/cadastro-produtos.component';
import { CadastroClientesComponent } from './views/cadastro-cliente/cadastro-clientes.component';
import { CadastroPedidosClientesComponent } from './views/cadastro-pedido-cliente/cadastro-pedidos-clientes.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { ListaClientesComponent } from './views/lista-clientes/lista-clientes.component';
import { ListaProdutosComponent } from './views/lista-produtos/lista-produtos.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarrinhoNotificacaoComponent } from './components/carrinho-notificacao/carrinho-notificacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CadastroLojasComponent } from './views/cadastro-loja/cadastro-lojas.component';
import { CadastroCampanhasComponent } from './views/cadastro-campanha/cadastro-campanhas.component';
import { ListaPedidosComponent } from './views/lista-pedidos/lista-pedidos.component';
import { ListaLojasComponent } from './views/lista-lojas/lista-lojas.component';
import { ListaCampanhasComponent } from './views/lista-campanhas/lista-campanhas.component';


registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CadastroProdutosComponent,
    CadastroClientesComponent,
    CadastroPedidosClientesComponent,
    LoginComponent,
    ListaClientesComponent,
    ListaProdutosComponent,
    FooterComponent,
    CarrinhoNotificacaoComponent,
    DashboardComponent,
    CadastroLojasComponent,
    CadastroCampanhasComponent,
    ListaPedidosComponent,
    ListaLojasComponent,
    ListaCampanhasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleChartsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
