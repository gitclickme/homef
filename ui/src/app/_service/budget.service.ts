import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MApiRes } from '@model/MApiRes';
import { Observable } from 'rxjs';
import { environment } from 'ui/src/environments/environment';
import { MBudget } from '@model/MBudget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  private budgetURL: string = `${environment.apiUrl}/api/v1.0/budget`;

  getBudgetList(searchDate:string, idItem:number): Observable<MApiRes> {
   // let query = Util.serialize(stockHistorySearch);
    //query += '&pageNumber='+pageNumber+'&rowXPage='+rowXPage;
    let query = `searchDate=${searchDate}&idItem=${idItem}`;
    return this.http.get<MApiRes>(`${this.budgetURL}/?${query}`);
  }

  budgetCreate(budget:MBudget):Observable<MApiRes>{
    return this.http.post<MApiRes>(`${this.budgetURL}`, budget);
  }

  budgetUpdate(budget:MBudget):Observable<MApiRes>{
    return this.http.put<MApiRes>(`${this.budgetURL}`, budget);
  }

  budgetIdFind(idItem:number, operationDate:string):Observable<MApiRes>{
    return this.http.get<MApiRes>(`${this.budgetURL}/id/${idItem}/${operationDate}`);
  }

  budgetsOpen(idBudgetString: string){
    return this.http.post<MApiRes>(`${this.budgetURL}/open`, {idBudgetString:idBudgetString});
  }



}

