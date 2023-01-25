import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Pedido } from "src/app/models/modeloPedidos";
import { PedidoCPF } from "src/app/models/modelViewDash/modeloPedidoComCpf";
import { environment } from "src/environments/environment";
import { GetToken } from "../token/getToken";


export class PedidoServico{
    constructor(private http:HttpClient) { }

    public async listarPedidos(): Promise<Pedido[] | undefined> {
        let pedido:Pedido[] | undefined = await firstValueFrom(this.http.get<Pedido[]>(`${environment.API}/pedidos`, {headers:GetToken.token()}))
        return pedido;
    }

    public async criarPedido(pedido:Pedido): Promise<Pedido | undefined> {
        let pedidoRest:Pedido | undefined = await firstValueFrom(this.http.post<Pedido>(`${environment.API}/pedidos/`, pedido, {headers:GetToken.token()}))
        console.log(pedidoRest);
        return pedidoRest;
    }

    public async editarPedido(pedido:Pedido): Promise<Pedido | undefined> {
        let pedidoRest:Pedido | undefined = await firstValueFrom(this.http.put<Pedido>(`${environment.API}/pedidos/${pedido.id}`, pedido, {headers:GetToken.token()}))
        return pedidoRest;
    }

    public async buscarPedidoPorId(id:Number): Promise<Pedido | undefined> {
        return await firstValueFrom(this.http.get<Pedido | undefined>(`${environment.API}/pedidos/${id}`, {headers:GetToken.token()}))
    }

    public async listarPedidosComCpf(): Promise<PedidoCPF[] | undefined> {
        let pedidos:PedidoCPF[] | undefined = await firstValueFrom(this.http.get<PedidoCPF[]>(`${environment.API}/cpf/pedidos`, {headers:GetToken.token()}))
        return pedidos;
    }

    public excluirpedidoPorId(id:Number) {
        firstValueFrom(this.http.delete(`${environment.API}/pedidos/${id}`, {headers:GetToken.token()}))
    }

    public async listarTamanhoPedidos(): Promise<undefined> {
        let tamanhoPedido: number | any = await (await firstValueFrom(this.http.get<Pedido[]>(`${environment.API}/pedidos`, {headers:GetToken.token()}))).length
        return tamanhoPedido;
    }
}