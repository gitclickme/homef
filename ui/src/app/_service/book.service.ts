import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MApiRes } from '@model/MApiRes';
import { MInput } from '@model/MInput';
import { MOutput } from '@model/MOutput';
import { Observable } from 'rxjs';
import { environment } from 'ui/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private bookURL: string = `${environment.apiUrl}/api/v1.0/book`;

  getBookList(bookType: number, idItem:number, idVendor: number, beginDate:string, endDate:string): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.bookURL}/${bookType}/${idItem}/${idVendor}/${beginDate}/${endDate}`);
   }

   bookInput(input: MInput): Observable<MApiRes> {
      return this.http.post<MApiRes>(`${this.bookURL}/input`, input);
   }

   bookInputUpdate(input: MInput): Observable<MApiRes> {
    return this.http.put<MApiRes>(`${this.bookURL}/input`, input);
  }

 bookInputDelete(idOperation: number): Observable<MApiRes> {
  return this.http.delete<MApiRes>(`${this.bookURL}/input/${idOperation}`);
  }

   bookOutput(output:MOutput): Observable<MApiRes> {
      return this.http.post<MApiRes>(`${this.bookURL}/output`, output);
   }

   bookOutputUpdate(output:MOutput): Observable<MApiRes> {
    return this.http.put<MApiRes>(`${this.bookURL}/output`, output);
 }

 bookOutputDelete(idOperation:number): Observable<MApiRes> {
    return this.http.delete<MApiRes>(`${this.bookURL}/output/${idOperation}`);
}

}
