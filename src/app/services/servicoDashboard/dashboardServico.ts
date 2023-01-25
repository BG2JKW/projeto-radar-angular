import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { ModeloClientesEstado } from "src/app/models/modelViewDash/modeloClientesEstado";
import { ModeloProdutoInfo } from "src/app/models/modelViewDash/modeloProdutoInfo";
import { environment } from "src/environments/environment";
import { GetToken } from "../token/getToken";

export class DashboardServico{

    constructor(private http:HttpClient) { }

    public async modeloProdutoInfo(): Promise<ModeloProdutoInfo | undefined> {
        let modeloProdutoInfo:ModeloProdutoInfo | undefined = await firstValueFrom(this.http.get<ModeloProdutoInfo>(`${environment.API}/info/produtos`, {headers:GetToken.token()}))
        return modeloProdutoInfo;
    }
    public async modeloClientesPorEstado(): Promise<ModeloClientesEstado | undefined> {
        let modeloClientesPorEstado:ModeloClientesEstado | undefined = await firstValueFrom(this.http.get<ModeloClientesEstado>(`${environment.API}/estados/clientes`, {headers:GetToken.token()}))
        return modeloClientesPorEstado;
    }

}