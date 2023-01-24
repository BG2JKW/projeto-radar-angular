import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Produto } from "src/app/models/modeloProduto";
import { environment } from "src/environments/environment";
import { GetToken } from "../token/getToken";

export class ProdutoServico{

    constructor(private http:HttpClient) { }

    public async listarProdutos(): Promise<Produto[] | undefined> {
        let produto:Produto[] | undefined = await firstValueFrom(this.http.get<Produto[]>(`${environment.API}/produtos`, {headers:GetToken.token()}))
        return produto;
    }

    public async criarProduto(produto:Produto): Promise<Produto | undefined> {
        let produtoRest:Produto | undefined = await firstValueFrom(this.http.post<Produto>(`${environment.API}/produtos/`, produto, {headers:GetToken.token()}))
        console.log(produto);
        return produtoRest;
    }

    public async editarProduto(produto:Produto): Promise<Produto | undefined> {
        let produtoRest:Produto | undefined = await firstValueFrom(this.http.put<Produto>(`${environment.API}/produtos/${produto.id}`, produto, {headers:GetToken.token()}))
        return produtoRest;
    }

    public async buscarProdutoPorId(id:Number): Promise<Produto | undefined> {
        return await firstValueFrom(this.http.get<Produto | undefined>(`${environment.API}/produtos/${id}`, {headers:GetToken.token()}))
    }

    public excluirProdutoPorId(id:Number) {
        firstValueFrom(this.http.delete(`${environment.API}/produtos/${id}`, {headers:GetToken.token()}))
    }

}