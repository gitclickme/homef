import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MApiRes } from '@model/MApiRes';
import { Observable } from 'rxjs';
import { environment } from 'ui/src/environments/environment';
import { MVendor } from '@model/MVendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }



  private vendorURL: string = `${environment.apiUrl}/api/v1.0/vendor`;

  getVendorList(active: number): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.vendorURL}/${active}`);
  }

  getVendorByItemList(idItem: number): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.vendorURL}/item/${idItem}`);
  }

  getVendorByItemListAll(idItem: number): Observable<MApiRes> {
    return this.http.get<MApiRes>(`${this.vendorURL}/allitem/${idItem}`);
  }


  vendorCreate(vendor:MVendor):Observable<MApiRes>{
    return this.http.post<MApiRes>(`${this.vendorURL}`, vendor);
  }

  vendorUpdate(vendor:MVendor):Observable<MApiRes>{
    return this.http.put<MApiRes>(`${this.vendorURL}/${vendor.idVendor}`, vendor);
  }

}
