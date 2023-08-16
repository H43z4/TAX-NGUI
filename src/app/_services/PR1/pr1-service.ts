import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PR1 } from 'src/app/_models/Issuances/PR1Model';
import { Dropdown, DropdownApi } from 'src/app/_models/setup/Dropdown';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PR1Service {

  constructor(private http: HttpClient) {
  }
  



  PR1BasicInfo(pr1: PR1) {
    return this.http.post<any>(`${environment.apiUrlsample}/Permit/SavePermit`, pr1)
  }
  UploadPhoto(formData: FormData ) {
    debugger
    return this.http.post<any>(`${environment.apiUrlsample}/Person/Upload`, formData)
    .pipe(map(res => {
      return res; })); 
  }
  PRList() {
    return this.http.get<any>(`${environment.apiUrlsample}/Permit/GetPermitList`)
  }

  PRDetailById(id: any) {
    return this.http.get<any>(`${environment.apiUrlsample}/Permit/GetPermitApplicationListById?id=`+id)
  }
  // CancellUserPermissions(UserId:number, PermissionId:number){
    
  //   return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/CancellUserPermission`, { "UserId":UserId, "PermissionId":PermissionId } )
  //   .pipe(map(res => {
  //     return res; })); 
  //   }




  // addArea(data: any): Observable<any[]> {
  //   const token = localStorage.getItem('token');
  //   const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
  //   return this.http.post<any[]>(this.baseUrl + 'area', data , {headers: header});
  // }
}
