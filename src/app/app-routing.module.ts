import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroCampanhasComponent } from './views/cadastro-campanha/cadastro-campanhas.component';
import { CadastroClientesComponent } from './views/cadastro-cliente/cadastro-clientes.component';
import { CadastroLojasComponent } from './views/cadastro-loja/cadastro-lojas.component';
import { CadastroPedidosClientesComponent } from './views/cadastro-pedido-cliente/cadastro-pedidos-clientes.component';
import { CadastroProdutosComponent } from './views/cadastro-produto/cadastro-produtos.component';
import { HomeComponent } from './views/home/home.component';
import { ListaCampanhasComponent } from './views/lista-campanhas/lista-campanhas.component';
import { ListaClientesComponent } from './views/lista-clientes/lista-clientes.component';
import { ListaLojasComponent } from './views/lista-lojas/lista-lojas.component';
import { ListaPedidosComponent } from './views/lista-pedidos/lista-pedidos.component';
import { ListaProdutosComponent } from './views/lista-produtos/lista-produtos.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
 {path: '', component:HomeComponent},
 {path: 'login', component:LoginComponent},
 {path: 'cadastro-cliente', component:CadastroClientesComponent},
 {path: 'lista-clientes', component:ListaClientesComponent},
 {path: 'altera-cliente/:id', component:CadastroClientesComponent},
 {path: 'cadastro-produto', component:CadastroProdutosComponent},
 {path: 'lista-produtos', component:ListaProdutosComponent},
 {path: 'altera-produto/:id', component:CadastroProdutosComponent},
 {path: 'cadastro-pedidos', component:CadastroPedidosClientesComponent},
 {path: 'lista-pedidos', component: ListaPedidosComponent},
 {path: 'lista-lojas', component: ListaLojasComponent},
 {path: 'lista-campanhas', component:ListaCampanhasComponent},
 {path: 'dashboard', component:DashboardComponent },
 {path: 'cadastro-lojas', component:CadastroLojasComponent},
 {path: 'cadastro-campanhas', component: CadastroCampanhasComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
