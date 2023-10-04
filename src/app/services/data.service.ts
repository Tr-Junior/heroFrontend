import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Caso } from "../models/caso.model";
import { Security } from "../utils/Security.util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('x-access-token', token);
    return headers;

  }
  create(data: any) {
    return this.http.post(`${this.url}/ongs/cadastro`, data);
  }

  createCaso(data: any) {
    return this.http.post(`${this.url}/incidents/novo`, data, { headers: this.composeHeaders() });
  }

  getCaso(ong: any): Observable<any> {
    return this.http.get<Caso[]>(`${this.url}/incidents/selectIncidents/` + ong, { headers: this.composeHeaders() });
  }
  deleteCaso(id: any): Observable<any> {
    return this.http.delete(`${this.url}/incidents/deletIncident/` + id, { headers: this.composeHeaders() })
  }

  authenticate(data: any) {
    return this.http.post(`${this.url}/ongs/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${this.url}/ongs/refresh-token`, null, { headers: this.composeHeaders() });
  }

}
