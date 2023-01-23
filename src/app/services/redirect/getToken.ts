import { HttpHeaders } from "@angular/common/http";

export class GetToken{
    public static token() {
        const headerToken = new HttpHeaders().set("Authorization","Bearer "+ localStorage.getItem('token'));
        return headerToken;
    }

}
