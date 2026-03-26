import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MApiRes } from '@model/MApiRes';
import { Observable } from 'rxjs';
import { environment } from 'ui/src/environments/environment';
import { MItem } from '@model/MItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  private itemURL: string = `${environment.apiUrl}/api/v1.0/item`;

  getItemList(active: number): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.itemURL}/${active}`);
  }


  itemCreate(item:MItem):Observable<MApiRes>{
    return this.http.post<MApiRes>(`${this.itemURL}`, item);
  }

  itemUpdate(item:MItem):Observable<MApiRes>{
    return this.http.put<MApiRes>(`${this.itemURL}`, item);
  }

}
