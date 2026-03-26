import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'ui/src/environments/environment';
import { MApiRes } from '@model/MApiRes';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private accountURL: string = `${environment.apiUrl}/api/v1.0/account`;

  getAccountList(): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.accountURL}`);
   }

}
